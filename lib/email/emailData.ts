import { sportAPI } from "../../interceptor/axiosInterceptor"
import { MatchDetailedInterface, PlayerMatchStatisticsInterface ,MatchCommonInterface, MatchStatisticsInterface} from "../../interfaces/MatchInterface"
import { SportAPIInterface } from "../../interfaces/SportAPIınterface";
import Match from "../../models/Match";
import Player from "../../models/Player";
import User, { IUser } from "../../models/User";
import nodemailer from "nodemailer";
import mongooseConnection from "../mongoose";
import { exit } from "process";
import { createTemplate } from "./template.js";




// create reusable transporter object using the default SMTP transport
const  transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER, // generated ethereal user
    pass: process.env.EMAIL_SERVER_PASSWORD // generated ethereal password
  },
});

const getDetailedMatch = async (matchID : number) => {
    const response = await sportAPI.get<SportAPIInterface<Array<MatchDetailedInterface>>>(`/events/${matchID}/lineups`);
    return response.data.data;
}

const findEmailTargets = async () => {
   return  await User.find({likedPlayers : {$exists : true, $ne : []},emailVerified : {$ne : null}},"likedPlayers email name -_id").lean();
}


export const getCommonData = async () => {
    const topScorers = await Player.find({},"name statistics.attacking.goals  -_id").sort({"statistics.attacking.goals" : -1}).limit(3).lean();

    const topAssists = await Player.find({},"name statistics.passes.assists  -_id").sort({"statistics.passes.assists" : -1}).limit(3).lean();

    return {
        topScorers,
        topAssists
    }
    


}


const generateTemplate   =  (user : IUser, commonData : Awaited<ReturnType<typeof getCommonData>>, weeklyCommonData : MatchCommonInterface,userWithLikedPlayers : Array<PlayerMatchStatisticsInterface | undefined> ,maximumRound : number) => {
    return createTemplate(weeklyCommonData,commonData,user,userWithLikedPlayers,maximumRound);

}





const getWeeklyCommonData = async ( matches : Awaited<ReturnType<typeof findMatchesBetweenDates>> , playerData : Awaited<ReturnType<typeof getThisWeekPlayerData>>  ) => {

 

    const detailedResults = await Promise.all(matches.map(async (match) => await sportAPI.get<SportAPIInterface<Array<MatchStatisticsInterface>>>(`/events/${match.id}/statistics`)))

    const commonData = detailedResults.reduce((commonData,match) => {
        const matchDatas = match.data.data;
        

        const yellow_cards_data = matchDatas.filter((data) => data.group === "tvdata" && data.period === "all" && data.name === "yellow_cards")?.at(0)


        
        const red_cards_data = matchDatas.filter((data) => data.group === "tvdata" && data.period === "all" && data.name === "red_cards")?.at(0)

        const yellow_cards = yellow_cards_data?.home ? parseInt(yellow_cards_data.home) : 0 + (yellow_cards_data?.away ? parseInt(yellow_cards_data.away) : 0);
        const red_cards = red_cards_data?.home ? parseInt(red_cards_data.home) : 0 + (red_cards_data?.away ? parseInt(red_cards_data.away) : 0);
        
        commonData.red_cards += red_cards;
        commonData.yellow_cards += yellow_cards;


        return commonData;
    }
    ,{
        red_cards : 0,
        yellow_cards : 0,
        goals : 0,
        goal_assist : 0
    } as MatchCommonInterface)


    const playerDataResult = Array.from(playerData.values()).reduce((commonData,player) => {
        const goals = player.goals ?? 0
        const goal_assist = player.goal_assist ?? 0
        commonData.goals += goals;
        commonData.goal_assist += goal_assist;
        return commonData;
    },commonData)




    return playerDataResult;
  
}
    


        


const findMatchesBetweenDates = async (startDate : Date, endDate : Date) => {
    const result =  await Match.find({
        status : "finished",
        start_at : {
            $gte : startDate,
            $lte : endDate
        }
        
    }, "id round_number -_id").lean()


    return result;
}

export async function getThisWeekPlayerData(matches : Awaited<ReturnType<typeof findMatchesBetweenDates>>) {


    const playerMap  =  await Player.find({},"id _id").lean().then((players) => {
        return players.reduce((map,player) => {
            map.set(player.id,player._id.toString())
            return map;
        },new Map<number,string>())
    })








    const playerMatchStatistics = new Map<string, PlayerMatchStatisticsInterface>();



    const resultAll =  await Promise.all(matches.map(async (match) => {
        const detailedMatch = await getDetailedMatch(match.id);
    
            return detailedMatch.flatMap((match) => {
                    return {
                        lineup_players : match.lineup_players,
                        team : match.team
                    }
                
            })

    }))





    resultAll.flat().forEach((data) => {

        data.lineup_players.forEach((player) => {
            if (!player.player_statistics)
            return;


        const convertedId = playerMap.get(player.player_id);



        if (!convertedId) {
            return;
        }


        const currentStatistics = playerMatchStatistics.get(convertedId) ?? {
            goal_assist : 0,
            goals : 0,
            minutes_played : 0,
            rating : 0,
            name : player.player?.name,
            position_name : player.player?.position_name,
            photo : player.player?.photo,
            slug : player.player?.slug,
            team_name : data?.team?.name,

            
        }



        playerMatchStatistics.set(convertedId,{
            ...currentStatistics,


                goal_assist : (currentStatistics?.goal_assist ?? 0) + (player.player_statistics.goal_assist ?? 0),
                goals : (currentStatistics?.goals ?? 0) + (player.player_statistics.goals ?? 0),
                minutes_played : (currentStatistics?.minutes_played ?? 0) + (player.player_statistics.minutes_played ?? 0),
                rating : (currentStatistics?.rating ?? 0) + (player.player_statistics.rating ?? 0),

        })
    })

            
        
        
    })

    return  playerMatchStatistics;




}



export async  function generateWeeklyReports() {

    await mongooseConnection();


    const weeklyMatches = await findMatchesBetweenDates(new Date("2022-11-4"),new Date("2022-11-12"));

    const weeklyPlayerData = await getThisWeekPlayerData(weeklyMatches);




    const weeklyCommonData = await getWeeklyCommonData(weeklyMatches,weeklyPlayerData);


    

    const commonData = await getCommonData();


    const userWithLikedPlayers =  await findEmailTargets();


    const userEmailMap = new Map<string,string>();

    const weeklyPlayerDataKeys = Array.from(weeklyPlayerData.keys());


    const maximumRound = weeklyMatches.reduce((max,match) => {
        return Math.max(max,parseInt(match.round_number));
    },0)


    





    userWithLikedPlayers.forEach((user) => {

        const likedPlayers = user.likedPlayers.map((player) => player._id.toString());




        const likedPlayersInWeeklyData = likedPlayers.filter((player) => weeklyPlayerDataKeys.includes(player)).sort((a,b) => {
            const playerA = weeklyPlayerData.get(a);
            const playerB = weeklyPlayerData.get(b);

            if (!playerA?.rating || !playerB?.rating)
            return 0;

            return playerB.rating - playerA.rating;
            
        }).slice(0,10).map((player) => weeklyPlayerData.get(player))

       

        const personalTemplate =  generateTemplate(user,commonData,weeklyCommonData,likedPlayersInWeeklyData,maximumRound)

        userEmailMap.set(user.email,personalTemplate);

    })

    await Promise.all(Array.from(userEmailMap.entries()).map(async ([email,template]) => {
        const info = await transporter.sendMail({
            from : '"Scoutff Football" <bisiler@scoutff.com>',
            to : email,
            subject : "Weekly Report",
            html : template
            
        })


    }))
    

   



}











