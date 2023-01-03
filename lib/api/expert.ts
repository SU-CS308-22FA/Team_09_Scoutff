import { ObjectId } from "mongoose";
import { PlayerInterface } from "../../interfaces/PlayerInterface";
import Expert from "../../models/Expert";
import Player from "../../models/Player";
import mongooseConnection from "../mongoose"

type WeeklyMatchProps = {
    weekNumber : number,
    expert : string
}

export type WeeklyMatchRecord = Record<string, SingleMatchRecord>

export type SingleMatchRecord = {
    comment : string,
    players : PlayerInterface[]
}

const indexToFootballPosition11Players = ["GK","LB","LCB","RCB","RB","LCM","RCM","CAM","LW","RW","ST"] as const;


export async function getAllExperts() {

    await mongooseConnection();

    const experts = await Expert.find().lean();

    return experts;

}


export async function  getAllSquadOfExpert(expert : string) {

    await mongooseConnection();
    



    const allSquads  = await Expert.findById(expert).select(`weeklySquads -_id`).populate({
        path : "weeklySquads.$*.players",
        model : Player,
        select : "name slug photo"
    }).lean();



    Object.values(allSquads?.weeklySquads ?? {}).forEach((week) => {
       
        week.players = (week.players).map((player,index) => {
            return {
                ...player,
                footballPosition : indexToFootballPosition11Players[index]
            }
        })
        delete week._id;
    })













  


    return allSquads;


}


export async function createSquadOfExpert({weekNumber,expert,comment,players} : WeeklyMatchProps & {comment : string,players : string[]}) {

    await mongooseConnection();

    const  week = `week${weekNumber}`;

    await Expert.findByIdAndUpdate(expert,{
        $set : {
            [`weeklySquads.${week}.comment`] : comment,
            [`weeklySquads.${week}.players`] : players
        }
    })

}




export async function getSquadOfWeek({weekNumber,expert} : WeeklyMatchProps) {

    await mongooseConnection();

    const  week = `week${weekNumber}`;




    const weeklyTeam  = await Expert.findById(expert).populate({
        path : `weeklySquads.${week}.players`,
        model : Player,
        select : "name slug photo"
    }).select(`weeklySquads.${week} -_id`).lean();




    const teams = weeklyTeam?.weeklySquads as unknown as WeeklyMatchRecord

    if (!teams) return null;

    const team = teams[week];

    if (!team) return null;


    const teamWithFootballPositions = team.players?.map((player,index) => {
        return {
            ...player,
            footballPosition : indexToFootballPosition11Players[index]
        }
    })



    


                            

    
    

    return  {
        comment : team.comment,
        team : teamWithFootballPositions
    }


  }

