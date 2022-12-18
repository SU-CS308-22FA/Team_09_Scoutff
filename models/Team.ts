import mongoose, { Schema } from "mongoose";
import {TeamInterface} from "../interfaces/TeamInterface";









const TeamSchema  = new Schema<TeamInterface> ({
    logo : {
        type : String,
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
    has_logo : {
        type : Boolean,
    },
    id : {
        type : Number,
        required : true,
        unique : true
    },
    



    

    


    
})



type InterfaceTeamDemo = mongoose.Document & TeamInterface

export default (mongoose.models.Team as mongoose.Model<InterfaceTeamDemo>) || mongoose.model('Team', TeamSchema)
