import { SchemaMetaFieldDef } from "graphql";
import mongoose, { Schema } from "mongoose";
import { PlayerInterface } from "../interfaces/PlayerInterface";

export interface IUser {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    image: string;
    password: string;
    role: string;
    emailVerified: Date | null;
    likedPlayers: Array<PlayerInterface>;
    squads: { [key: string]: { players: Array<{ id: string }>, comment: string } };
    weeklySquads ?: Record<string, {
        comment : string,
        players : Array<PlayerInterface | null>
        _id ?: Schema.Types.ObjectId
    }>,
    bio ?: string,}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fvectors%2Fsoccer-player-avatar&psig=AOvVaw3EIsK1iTJWeFNyYmNJLfap&ust=1667127936735000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIi_xtWlhfsCFQAAAAAdAAAAABAE"
    },
    
    role:  {
        type: String,
        default: "user",
        
        enum: ["user", "admin", "commentator", "premium"],

    },
    emailVerified: {
        type: Date,
        default: null
    },
    likedPlayers: [{
        type: Schema.Types.ObjectId,
        ref: "Player",
        default: []
    }],
    weeklySquads : {
        type : Map,
        of : {
            comment : {
                type : String,
                default : ""
            },
            players : {
                type : Array,
                default : []
            }
        },
        

        default : {}
    },


    bio : {
        type : String,
    }

},{
    discriminatorKey : "role"

})


type InterfaceUser = mongoose.Document & IUser



export default (mongoose.models.User  as mongoose.Model<InterfaceUser>) || mongoose.model("User",userSchema)

