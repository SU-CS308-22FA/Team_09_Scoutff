import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";

export interface IPlayer {
    name: string;
    slug: string;
    rating: number;
    photo: string;
    flag: string;
    likedBy : Array<IUser>;
}


const playerSchema = new Schema<IPlayer>({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    slug: {
        type: String,
        required: [true, "Please enter a slug"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    photo: {
        type: String,
        required : [true, "Please enter a photo"],
    },
    flag : {
        type: String,
        required : [true, "Please enter a flag"],
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    

})


type InterfacePlayer = mongoose.Document & IPlayer



export default (mongoose.models.Player  as mongoose.Model<InterfacePlayer>) || mongoose.model("Player",playerSchema)

