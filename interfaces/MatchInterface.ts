import { Mongoose } from "mongoose";
import { Schema } from "mongoose";

export interface MatchInterface {
    _id: Schema.Types.ObjectId;
    id: number;
    home_team_id : number;
    away_team_id : number;
    name : string;
    slug : string;
    status : "finished" | "notstarted" | "inprogress" | "postponed" | "canceled";
    home_score ?: {
        current : number
    }
    away_score?: {
        current : number
    },
    start_at : Date;
    winner_code : 0 | 1 | 2 | 3,
    round_number : string;
 }

 export  interface PlayerMatchStatisticsInterface {
    minutes_played ?: number;
    rating ?: number;
    goals ?: number;
    goal_assist ?: number;
    name ?: string;
    slug ?: string;
    position_name ?: string;
    team_name ?: string;
    photo ?: string;
    matches_played : number;
    
}
 

 export interface MatchDetailedInterface {
    lineup_players : [{
        player_id : number;
        player_statistics ?: PlayerMatchStatisticsInterface
        player ?: {
            name : string;
            position_name : string;
            slug : string;
            photo : string;

        }

    }],
    team ?: {
        name : string;
    }
 }



 

 export interface MatchStatisticsInterface {
    name : string;
    group : string;
    home : string;
    away : string;
    period : string;
 }

 export interface MatchCommonInterface {
    red_cards : number;
    yellow_cards : number;
    goals : number;
    goal_assist : number;
    

 }