import mongoose, { Schema } from "mongoose";
import { ConvertedAttacking, ConvertedCards, ConvertedDefending, ConvertedMatches, ConvertedMore, ConvertedOther, ConvertedPasses, GoalkeepingConvertInterface, GoalkeepingMoreConvertInterface, PlayerWithStatisticsInterface, StatisticsInterface } from "../interfaces/PlayerInterface";


const CardSchema = new Schema<ConvertedCards>({
    red_cards : {
        type : Number,
    },
    yellow_cards : {
        type : Number,
    },
    yellow_red_cards : {
        type : Number,
    }
})

const DefendingSchema = new Schema<ConvertedDefending>({
    interceptions_per_game : {
        type : Number
    },
    
    tackles_per_game : {
        type : Number
    },

    challenges_lost_per_game : {
        type : Number
    },
    error_lead_to_a_shot : {
        type : Number
    },
    error_lead_toa_goal : {
        type : Number
    },
    penalties_conceded : {
        type : Number
    },
    total_clearances_per_game : {
        type : Number
    },
    possession_won_final_third : {
        type : Number
    },
    clean_sheets : {
        type : Number
    },



})

const MatchSchema = new Schema<ConvertedMatches>({
    matches_starting : {
        type : Number
    },
    matches_total : {
        type : Number
    },
    minutes_per_game : {
        type : Number
    },
})



const PassesSchema = new Schema<ConvertedPasses>({
    assists : {
        type : Number
    },
    key_passes : {
        type : Number
    },
    accurate_chipped_passes : {
        type : Number
    },
    accurate_passes_per_game : {
        type : Number
    },
    successful_crosses_and_corners : {
        type : Number
    },
    successful_long_passes : {
        type : Number
    },
    successful_passes_opposition_half : {
        type : Number
    },
    successful_passes_own_half : {
        type : Number
    },
    touches : {
        type : Number
    },
    big_chance_created : {
        type : Number
    },
    accurate_chipped_passes_percentage : {
        type : Number
    },
    accurate_passes_per_game_percentage : {
        type : Number
    },
    successful_crosses_and_corners_percentage : {
        type : Number
    },
    successful_long_passes_percentage : {
        type : Number
    },
    successful_passes_opposition_half_percentage : {
        type : Number
    },
    successful_passes_own_half_percentage : {
        type : Number
    },

})

const OtherSchema = new Schema<ConvertedOther>({
    aerial_duels_won_per_game : {
        type : Number
    },
    aerial_duels_won_per_game_percentage : {
        type : Number
    },
    duels_won_per_game : {
        type : Number
    },
    duels_won_per_game_percentage : {
        type : Number
    },
    fouls : {
        type : Number
    },
    ground_duels_won_per_game : {
        type : Number
    },
    ground_duels_won_per_game_percentage : {
        type : Number
    },
    offsides : {
        type : Number
    },
    possession_lost : {
        type : Number
    },
    successful_dribbles_per_game : {
        type : Number
    },
    successful_dribbles_per_game_percentage : {
        type : Number
    },
    was_fouled : {
        type : Number
    },


})
    
const MoreSchema = new Schema<ConvertedMore>({
    headed_goals : {
        type : Number
    },
    goals_conversion_percentage : {
        type : Number
    },
    goals_inside_box_successful : {
        type : Number
    },
    goals_outside_box_successful : {
        type : Number
    },
    goals_inside_box_tried : {
        type : Number
    },
    goals_outside_box_tried : {
        type : Number
    },
    left_foot_goals : {
        type : Number
    },
    right_foot_goals : {
        type : Number
    },
    penalties_conversion_percentage : {
        type : Number
    },
    penalties_successful : {
        type : Number
    },
    penalties_tried : {
        type : Number
    },
    penalty_won : {
        type : Number
    },
    set_piece_goals_successful : {
        type : Number
    },
    set_piece_goals_tried : {
        type : Number
    },
    set_pieces_conversion_percentage : {
        type : Number
    },
    


})


const  AttackingSchema = new Schema<ConvertedAttacking>({
    goals : {
        type : Number
    },
    goals_average : {
        type : Number
    },
    big_chance_missed : {
        type : Number
    },
    total_shots_per_game : {
        type : Number
    },
    more : {
        type : MoreSchema,
    },

    
})


const GoalKeepingMoreSchema = new Schema<GoalkeepingMoreConvertInterface>({
    goals_conceded : {
        type : Number
    },
    goals_conceded_inside_box : {
        type : Number
    },
    goals_conceded_outside_box : {
        type : Number
    },
    saves_caught : {
        type : Number
    },
    saves_from_inside_box : {
        type : Number
    },
    saves_from_outside_box : {
        type : Number
    },
    saves_parried : {
        type : Number
    },
    total_saves : {
        type : Number
    },

    
})
        

const GoalkeepingSchema = new Schema<GoalkeepingConvertInterface>({
    goals_conceded_per_game : {
        type : Number
    },
    penalties_saved_successful : {
        type : Number
    },
    saves_per_game : {
        type : Number
    },
    saves_per_game_percentage : {
        type : Number
    },
    succ_runs_out_per_game_percentage : {
        type : Number
    },
    succ_runs_out_per_game : {
        type : Number
    },
    more : {
        type : GoalKeepingMoreSchema,
    },
    penalties_saved_tried : {
        type : Number
    }

   

})

    


const StatisticSchema = new Schema<StatisticsInterface>({
    rating : {
        type : Number,
    },
    season_id : {
        type : Number,
        required : true,
    },
    cards : {
        type : CardSchema,
    },
    other : {
        type : OtherSchema,
    },
    defending : {
        type : DefendingSchema,
    },
    passes : {
        type : PassesSchema,
    },
    attacking : {
        type : AttackingSchema,
    },
    matches : {
        type : MatchSchema,
    },
    goalkeeping : {
        type : GoalkeepingSchema,
    },



   

})
    


const PlayerSchema  = new Schema<PlayerWithStatisticsInterface> ({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
    name_short : {
        type : String,
    },
    has_photo : {
        type : Boolean,
    },
    photo : {
        type : String,
    },
    position : {
        type : String,
    },
    position_name : {
        type : String,
    },
    rating : {
        type : Number,
    },
    age : {
        type : Number,
    },
    weight : {
        type : Number,
    },
    date_birth_at : {
        type : Date,
    },
    shirt_number : {
        type : String,
    },
    preferred_foot : {
        type : String,
    },

    nationality_code : {
        type : String,
    },
    flag : {
        type : String,
    },
    market_currency : {
        type : String,
    },
    market_value : {
        type : Number,
    },
    contract_until : {
        type : Date,
    },
    height : {
        type : Number,
    },
    statistics : {
        type : StatisticSchema,
    },
    team : {
        type : Schema.Types.ObjectId,
        ref : 'Team',
        required : true
    },




    
})



type InterfacePlayerDemo = mongoose.Document & PlayerWithStatisticsInterface

export default (mongoose.models.Player as mongoose.Model<InterfacePlayerDemo>) || mongoose.model('Player', PlayerSchema)
