import mongoose, { Schema } from "mongoose";
import { PlayerInterface } from "../interfaces/PlayerInterface";
import User, { IUser } from "./User";

export interface IExpert extends IUser {
    weeklySquads : Record<string, Array<PlayerInterface>>
}




type InterfacePlayerDemo = mongoose.Document & IExpert

const expertSchema  = new Schema<IExpert>({
    weeklySquads : {
        type : Map,
        of : [{
            type : Schema.Types.ObjectId,
            ref : mongoose.models.Player
        }],

        default : {}
    },




})


export default (mongoose.models.User?.discriminators?.commentator  as mongoose.Model<InterfacePlayerDemo>) || User.discriminator("commentator", expertSchema)


