import { IUser } from "../models/User";
import { TeamInterface } from "./TeamInterface";

type Modify<T, R> = Omit<T, keyof R> & R;
export interface PlayerInterface {
    footballPosition ?: string;
    _id : string;
    id: number;
    slug : string;
    name: string;
    name_short: string;
    has_photo?: boolean;
    photo?: string;
    position?: string;
    position_name?: string;
    rating?: number;
    age?: number;
    weight?: number;
    date_birth_at ?: Date;
    shirt_number?: string;
    preferred_foot?: string;
    nationality_code?: string;
    flag?: string;
    market_currency?: string;
    market_value?: number;
    contract_until?: Date;
    height ?: number;
    team : TeamInterface;
    likedBy : Array<IUser>;

}


export interface PlayerOriginInterface  extends Modify<PlayerInterface, {
    height ?: number;
    market_value ?: number;
    weight ?: number;
    age ?: number;
    rating ?: number;
}> {
}






export interface PlayerWithStatisticsInterface extends PlayerInterface {
    statistics?: StatisticsInterface ;
}




interface Matches {
    matches_total?: string;
    matches_starting?: string;
    minutes_per_game?: string;
}

export interface ConvertedMatches extends Modify<Matches, {
    matches_total?: number;
    matches_starting?: number;
    minutes_per_game?: number;
}> {}


interface Attacking {
    goals ?: string;
    goals_average ?: string;
    total_shots_per_game ?: string;
    big_chance_missed ?: string;
    more ?: More;
}

export interface ConvertedAttacking extends Modify<Attacking, {
    goals ?: number;
    goals_average ?: number;
    total_shots_per_game ?: number;
    big_chance_missed ?: number;
    more ?: ConvertedMore;
}> {}


export interface ConvertedMore {
    headed_goals ?: number;
    left_foot_goals ?: number;
    right_foot_goals ?: number;
    penalty_won ?: number;

    goals_conversion_percentage ?: number;
    penalties_conversion_percentage ?: number;
    set_pieces_conversion_percentage ?: number;

    goals_inside_box_successful ?: number;
    goals_inside_box_tried ?: number;

    goals_outside_box_tried ?: number;
    goals_outside_box_successful ?: number;

    set_piece_goals_tried ?: number;
    set_piece_goals_successful ?: number;


    penalties_tried ?: number;
    penalties_successful ?: number;



}

interface More {
    goal_conversion ?: string;
    penalties ?: string;
    penalties_conversion ?: string;
    set_piece_goals ?: string;
    set_pieces_conversion ?: string;
    goals_inside_box ?: string;
    goals_outside_box ?: string;
    headed_goals ?: string;
    left_foot_goals ?: string;
    right_foot_goals ?: string;
    penalty_won ?: string;
}

interface Passes {
    assists ?: string;
    touches ?: string;
    big_chance_created ?: string;
    key_passes ?: string;
    accurate_passes_per_game ?: string;
    successful_passes_own_half ?: string;
    successful_passes_opposition_half ?: string;
    successful_long_passes ?: string;
    accurate_chipped_passes ?: string;
    successful_crosses_and_corners ?: string;
}

export interface ConvertedPasses extends Modify<Passes, {
    assists ?: number;
    touches ?: number;
    big_chance_created ?: number;
    key_passes ?: number;
    accurate_passes_per_game ?: number;
    successful_passes_own_half ?: number;
    successful_passes_opposition_half ?: number;
    successful_long_passes ?: number;
    accurate_chipped_passes ?: number;
    successful_crosses_and_corners ?: number;
}> {
    successful_long_passes_percentage ?: number;
    successful_passes_opposition_half_percentage ?: number;
    accurate_chipped_passes_percentage ?: number;
    successful_crosses_and_corners_percentage ?: number;
    successful_passes_own_half_percentage ?: number;
    accurate_passes_per_game_percentage ?: number;
}



interface Defending {
    interceptions_per_game ?: string;
    tackles_per_game ?: string;
    possession_won_final_third ?: string;
    challenges_lost_per_game ?: string;
    total_clearances_per_game ?: string;
    error_lead_to_a_shot ?: string;
    error_lead_toa_goal ?: string;
    penalties_conceded ?: string;
    clean_sheets ?: string;
}

export interface ConvertedDefending extends Modify<Defending, {
    interceptions_per_game ?: number;
    tackles_per_game ?: number;
    possession_won_final_third ?: number;
    challenges_lost_per_game ?: number;
    total_clearances_per_game ?: number;
    error_lead_to_a_shot ?: number;
    error_lead_toa_goal ?: number;
    penalties_conceded ?: number;
    clean_sheets ?: number;
}> {}



interface Other {
    successful_dribbles_per_game ?: string;
    duels_won_per_game ?: string;
    ground_duels_won_per_game ?: string;
    aerial_duels_won_per_game ?: string;
    possession_lost ?: string;
    fouls ?: string;
    was_fouled ?: string;
    offsides ?: string;
}

export interface ConvertedOther extends Modify<Other, {
    successful_dribbles_per_game ?: number;
    duels_won_per_game ?: number;
    ground_duels_won_per_game ?: number;
    aerial_duels_won_per_game ?: number;
    possession_lost ?: number;
    fouls ?: number;
    was_fouled ?: number;
    offsides ?: number;
}> {
    successful_dribbles_per_game_percentage ?: number;
    aerial_duels_won_per_game_percentage ?: number;
    ground_duels_won_per_game_percentage ?: number;
    duels_won_per_game_percentage ?: number;

}



interface Cards {
    yellow_cards ?: string;
    yellow_red_cards ?: string;
    red_cards ?: string;
}

export interface ConvertedCards extends Modify<Cards, {
    yellow_cards ?: number;
    yellow_red_cards ?: number;
    red_cards ?: number;
}> {}

export type Detail = {
    matches : Matches;
    attacking : Attacking;
    goalkeeping : Goalkeeping;
    passes : Passes;
    defending : Defending;
    other : Other;
    cards : Cards;
}

export interface StatisticsOriginInterface {
    rating?: number;
    season_id: number;
    details?: Detail;
}


export interface Goalkeeping {
    goals_conceded_per_game ?: string;
    penalties_saved ?: string;
    saves_per_game ?: string;
    succ_runs_out_per_game ?: string;
    more ?: GoalkeepingMoreOriginInterface;
}

export interface GoalkeepingConvertInterface {
    goals_conceded_per_game ?: number;
    penalties_saved_successful ?: number;
    penalties_saved_tried ?: number;
    saves_per_game ?: number;
    saves_per_game_percentage ?: number;
    succ_runs_out_per_game ?: number;
    succ_runs_out_per_game_percentage ?: number;
    more ?: GoalkeepingMoreConvertInterface;
}
    

export interface GoalkeepingMoreOriginInterface {
    goals_conceded ?: string;
    goals_conceded_inside_box ?: string;
    goals_conceded_outside_box ?: string;
    total_saves ?: string;
    saves_from_inside_box ?: string;
    saves_from_outside_box ?: string;
    saves_caught ?: string;
    saves_parried ?: string;

}


export interface GoalkeepingMoreConvertInterface {
    goals_conceded ?: number;
    goals_conceded_inside_box ?: number;
    goals_conceded_outside_box ?: number;
    total_saves ?: number;
    saves_from_inside_box ?: number;
    saves_from_outside_box ?: number;
    saves_caught ?: number;
    saves_parried ?: number;
    
}

    




export interface StatisticsInterface {
    rating?: number;
    season_id: number;
    matches?: ConvertedMatches;
    attacking?: ConvertedAttacking;
    passes?: ConvertedPasses;
    defending?: ConvertedDefending;
    other?: ConvertedOther;
    cards?: ConvertedCards;
    goalkeeping ?:  GoalkeepingConvertInterface;
}



