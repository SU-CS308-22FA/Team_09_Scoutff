import mongoose, { Schema } from "mongoose";
import { MatchInterface } from "../interfaces/MatchInterface";








const MatchSchema  = new Schema<MatchInterface> ({
    
    id : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
   
    away_team_id : {
        type : Number,
        required : true,
    },
    home_team_id : {
        type : Number,
        required : true,
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    home_score : {
        current : {
            type : Number,
        }
    },
    away_score : {
        current : {
            type : Number,
        }
    },
    start_at : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        enum : ["finished","notstarted","inprogress","postponed","canceled"],
        default : "notstarted"
    },
    winner_code : {
        type : Number,
        enum : [0,1,2,3],
        default : 0
    },
    round_number : {
        type : String,
        required : true
    },
    


  


  

    
    
    
})



type InterfaceMatchDemo = mongoose.Document & MatchInterface

export default (mongoose.models.Match as mongoose.Model<InterfaceMatchDemo>) || mongoose.model('Match', MatchSchema)
