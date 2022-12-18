import {sportAPI} from "../../interceptor/axiosInterceptor";
import { seasonID } from "../../config/sportConfig";
import { Detail, PlayerInterface, PlayerOriginInterface, PlayerWithStatisticsInterface, StatisticsInterface, StatisticsOriginInterface } from "../../interfaces/PlayerInterface";

import { SportAPIInterface } from "../../interfaces/SportApıInterface";
import { TeamInterface } from "../../interfaces/TeamInterface";

import Player from "../../models/Player";

import mongooseConnection from "../../lib/mongoose";
import { exit } from "process";
import Team from "../../models/Team";
import { MatchInterface } from "../../interfaces/MatchInterface";
import Match from "../../models/Match";






const parseSpecialFloat = (data : string | undefined) => {
    if (!data) {
        return undefined;
    }
    return parseFloat(data);
}


const getTeams = async () => {
    const response = await sportAPI.get<SportAPIInterface<Array<TeamInterface>>>(`/seasons/${seasonID}/teams`);
    return response.data.data;
}

const getPlayersOfTeam = async (teamID : number) => {
     const response = await sportAPI.get<SportAPIInterface<Array<PlayerOriginInterface>>>(`/teams/${teamID}/players`);
    return response.data.data;
}

const getPlayerStatistics = async (playerID : number) => {
    const response = await sportAPI.get<SportAPIInterface<Array<StatisticsOriginInterface>>>(`/players/${playerID}/statistics`);
    return response.data.data;
}

const getFixture = async () => {
    let counter = 1;
    const allMatches : Array<MatchInterface> = [];
    while (true) {
        const response = await sportAPI.get<SportAPIInterface<Array<MatchInterface>>>(`/seasons/${seasonID}/events`,{
            params : {
                page : counter
            }
        });

        if (response.data.data.length === 0) {
            break;
        }

        

        allMatches.push(...response.data.data);


        counter++;
    }

    return allMatches;
}





const convertDataToResultAndPercentage = (data : string | undefined ) => {
    if (!data) {
        return {
            total : undefined,
            percentage : undefined
        }
    } 
    const [total,percentage] = data.split(" ");
    return {
        total : parseSpecialFloat(total),
        percentage : parseSpecialFloat(percentage.replace(/[()]/g, ""))
    }
}


const convertSlashDataToResultAndPercentage = (data : string  | undefined) => {
    if (!data) {
        return {
            successful : undefined,
            tried : undefined
        }
    }
    const [successful,tried] = data.split("/");
    return {
        successful : parseSpecialFloat(successful),
        tried : parseSpecialFloat(tried)
    }
}

export async function  initUpdateDatabase() {
const teams = await getTeams();


const matchCount = await Match.countDocuments({});








const matches = await getFixture();
await Match.bulkWrite(matches.map((match) => {
    return {
        updateOne : {
            filter : {id : match.id},
            update : match,
            upsert : true
        }
    }
}));



const teamsWritten = await Team.bulkWrite(teams.map((team) => {
    return {
        updateOne : {
            filter : {id : team.id},
            update : team,
            upsert : true
        }
    }
}));






const databaseTeams = await Team.find({});





const playersOfTeam = await Promise.all(databaseTeams.flatMap(async (team ) => {
    const players = await getPlayersOfTeam(team.id);



    const convertedPlayers : Array<PlayerInterface> =   players.map((player) => {
        return {
            ...player,
            height : player.height ,
            market_value : player.market_value,
            weight : player.weight ,
            age : player.age,
            rating : player.rating,
            team : team._id
        }
    }
    )
    
    return convertedPlayers;
    
        
}


));

const flattenedPlayers = playersOfTeam.flat();

const keyMapping = new  Map<string, string>()
    .set("Attacking", "attacking")
    .set("Defending", "defending")
    .set("Passes", "passes")
    .set("Other (per game)", "other")
    .set("Cards", "cards")
    .set("Matches", "matches")
    .set("Goalkeeping", "goalkeeping");









const playerStatistics : Array<PlayerWithStatisticsInterface> = await Promise.all(flattenedPlayers.map(async (player) => {
    const statistics = await getPlayerStatistics(player.id);

    const currentSeason = statistics.find((statistic) => statistic.season_id === seasonID);

    const detailsRaw : any  = currentSeason?.details;


    


    if (detailsRaw && currentSeason) {

       

        

        //convert details array to hashmap using group_name property of child objects
        const details : Detail  = detailsRaw.reduce((acc : any, current : any) => {
            const {group_name, ...rest} = current;
            const convertedGrpName = keyMapping.get(group_name);
            

            if (convertedGrpName) {
            return {
                ...acc,
                [convertedGrpName] : rest
            }
            }
            else {
                return acc
            }
        }, {});



        
        
        




        

        

        
        const convertedStatistics : StatisticsInterface = {
            rating : currentSeason.rating,
            season_id : currentSeason.season_id,
    }


    if (details.attacking) {
        const attacking = details.attacking;
        const penalties_result = convertSlashDataToResultAndPercentage(attacking?.more?.penalties);
        const set_piece_goals_result = convertSlashDataToResultAndPercentage(attacking?.more?.set_piece_goals);
        const goals_inside_box_result = convertSlashDataToResultAndPercentage(attacking?.more?.goals_inside_box);
        const goals_outside_box = convertSlashDataToResultAndPercentage(attacking?.more?.goals_outside_box);
        
        convertedStatistics.attacking = {
            goals : parseSpecialFloat(attacking.goals),
            goals_average : parseSpecialFloat(attacking.goals_average),
            total_shots_per_game : parseSpecialFloat(attacking.total_shots_per_game),
            big_chance_missed : parseSpecialFloat(attacking.big_chance_missed),
            more : {
                headed_goals : parseSpecialFloat(attacking?.more?.headed_goals),
                left_foot_goals : parseSpecialFloat(attacking?.more?.left_foot_goals),
                right_foot_goals : parseSpecialFloat(attacking?.more?.right_foot_goals),
                penalty_won : parseSpecialFloat(attacking?.more?.penalty_won),
                penalties_conversion_percentage : parseSpecialFloat(attacking?.more?.penalties_conversion),
                set_pieces_conversion_percentage : parseSpecialFloat(attacking?.more?.set_pieces_conversion),
                goals_conversion_percentage : parseSpecialFloat(attacking?.more?.goal_conversion),
                goals_inside_box_successful : goals_inside_box_result.successful,
                goals_inside_box_tried : goals_inside_box_result.tried,
                goals_outside_box_successful : goals_outside_box.successful,
                goals_outside_box_tried : goals_outside_box.tried,
                penalties_successful : penalties_result.successful,
                penalties_tried : penalties_result.tried,
                set_piece_goals_successful : set_piece_goals_result.successful,
                set_piece_goals_tried : set_piece_goals_result.tried,

                
                
                
            }
        }
    }

    if (details.defending) {
        const defending = details.defending;

        convertedStatistics.defending = {
            challenges_lost_per_game : parseSpecialFloat(defending.challenges_lost_per_game),
            tackles_per_game : parseSpecialFloat(defending.tackles_per_game),
            interceptions_per_game : parseSpecialFloat(defending.interceptions_per_game),
            error_lead_to_a_shot : parseSpecialFloat(defending.error_lead_to_a_shot),
            error_lead_toa_goal : parseSpecialFloat(defending.error_lead_toa_goal),
            penalties_conceded : parseSpecialFloat(defending.penalties_conceded),
            possession_won_final_third : parseSpecialFloat(defending.possession_won_final_third),
            total_clearances_per_game : parseSpecialFloat(defending.total_clearances_per_game),
            clean_sheets : parseSpecialFloat(defending.clean_sheets),
        }
        

    }

    if (details.passes) {

        const passes = details.passes;
        const accurate_passes_per_game_result = convertDataToResultAndPercentage(passes.accurate_passes_per_game);
        const successful_passes_own_half_result = convertDataToResultAndPercentage(passes.successful_passes_own_half);
        const successful_passes_opposition_half_result = convertDataToResultAndPercentage(passes.successful_passes_opposition_half);
        const successful_long_passes_result = convertDataToResultAndPercentage(passes.successful_long_passes);
        const accurate_chipped_passes_result = convertDataToResultAndPercentage(passes.accurate_chipped_passes);
        const successful_crosses_and_corners_result = convertDataToResultAndPercentage(passes.successful_crosses_and_corners);

        convertedStatistics.passes = {
            assists : parseSpecialFloat(passes.assists),
            touches : parseSpecialFloat(passes.touches),
            big_chance_created : parseSpecialFloat(passes.big_chance_created),
            key_passes : parseSpecialFloat(passes.key_passes),
            accurate_chipped_passes : accurate_chipped_passes_result.total,
            accurate_chipped_passes_percentage : accurate_chipped_passes_result.percentage,
            accurate_passes_per_game : accurate_passes_per_game_result.total,
            accurate_passes_per_game_percentage : accurate_passes_per_game_result.percentage,
            successful_crosses_and_corners : successful_crosses_and_corners_result.total,
            successful_crosses_and_corners_percentage : successful_crosses_and_corners_result.percentage,
            successful_long_passes : successful_long_passes_result.total,
            successful_long_passes_percentage : successful_long_passes_result.percentage,
            successful_passes_own_half : successful_passes_own_half_result.total,
            successful_passes_own_half_percentage : successful_passes_own_half_result.percentage,
            successful_passes_opposition_half : successful_passes_opposition_half_result.total,
            successful_passes_opposition_half_percentage : successful_passes_opposition_half_result.percentage,
        }


    }

    if (details.goalkeeping) {
        const goalkeeping = details.goalkeeping;
        const penalties_saved_result = convertSlashDataToResultAndPercentage(goalkeeping?.penalties_saved);
        const saves_per_game_result = convertDataToResultAndPercentage(goalkeeping?.saves_per_game);
        const succ_runs_out_per_game_result = convertDataToResultAndPercentage(goalkeeping?.succ_runs_out_per_game);

        convertedStatistics.goalkeeping = {
            saves_per_game : saves_per_game_result.total,
            saves_per_game_percentage : saves_per_game_result.percentage,
            succ_runs_out_per_game : succ_runs_out_per_game_result.total,
            succ_runs_out_per_game_percentage : succ_runs_out_per_game_result.percentage,
            penalties_saved_successful : penalties_saved_result.successful,
            penalties_saved_tried : penalties_saved_result.tried,
            goals_conceded_per_game : parseSpecialFloat(goalkeeping.goals_conceded_per_game),
            more : {
                total_saves : parseSpecialFloat(goalkeeping.more?.total_saves),
                saves_parried : parseSpecialFloat(goalkeeping.more?.saves_parried),
                saves_from_outside_box : parseSpecialFloat(goalkeeping.more?.saves_from_outside_box),
                saves_from_inside_box : parseSpecialFloat(goalkeeping.more?.saves_from_inside_box),
                saves_caught : parseSpecialFloat(goalkeeping.more?.saves_caught),
                goals_conceded_outside_box : parseSpecialFloat(goalkeeping.more?.goals_conceded_outside_box),
                goals_conceded_inside_box : parseSpecialFloat(goalkeeping.more?.goals_conceded_inside_box),
                goals_conceded : parseSpecialFloat(goalkeeping.more?.goals_conceded),


               
            }

        }



    }

    if (details.cards) {
        const cards = details.cards;
        convertedStatistics.cards = {
            red_cards : parseSpecialFloat(cards.red_cards),
            yellow_cards : parseSpecialFloat(cards.yellow_cards),
            yellow_red_cards : parseSpecialFloat(cards.yellow_red_cards),
        }

    }


    if (details.other) {
        const other = details.other;
        const successful_dribbles_per_game_result = convertDataToResultAndPercentage(other.successful_dribbles_per_game);
        const duels_won_per_game_result = convertDataToResultAndPercentage(other.duels_won_per_game);
        const aerial_duels_won_per_game_result = convertDataToResultAndPercentage(other.aerial_duels_won_per_game);
        const ground_duels_won_per_game_result = convertDataToResultAndPercentage(other.ground_duels_won_per_game);

        convertedStatistics.other = {
            offsides : parseSpecialFloat(other.offsides),
            fouls : parseSpecialFloat(other.fouls),
            was_fouled : parseSpecialFloat(other.was_fouled),
            possession_lost : parseSpecialFloat(other.possession_lost),
            successful_dribbles_per_game : successful_dribbles_per_game_result.total,
            successful_dribbles_per_game_percentage : successful_dribbles_per_game_result.percentage,
            duels_won_per_game : duels_won_per_game_result.total,
            duels_won_per_game_percentage : duels_won_per_game_result.percentage,
            aerial_duels_won_per_game : aerial_duels_won_per_game_result.total,
            aerial_duels_won_per_game_percentage : aerial_duels_won_per_game_result.percentage,
            ground_duels_won_per_game : ground_duels_won_per_game_result.total,
            ground_duels_won_per_game_percentage : ground_duels_won_per_game_result.percentage,
        }

    }
    

    if (details.matches) {
        const matches = details.matches;

        convertedStatistics.matches = {
            matches_total : parseSpecialFloat(matches.matches_total),
            matches_starting : parseSpecialFloat(matches.matches_starting),
            minutes_per_game : parseSpecialFloat(matches.minutes_per_game),
        }
        

    }
    

    

   


    return {
        ...player,
        statistics : convertedStatistics
    }

    } 

    return {
        ...player,
        statistics : undefined
    }



    

    

    



}
));








await Player.bulkWrite(playerStatistics.map(player => ({
    updateOne : {
        filter : {id : player.id},
        update : {$set : player},
        upsert : true,
    
    }
})));



}















