import mongoose, { Schema } from "mongoose";
import { PlayerInterface } from "../interfaces/PlayerInterface";
import User, { IUser } from "./User";

export interface IExpert extends IUser {
    weeklySquads : Record<string, {
        comment : string,
        players : Array<PlayerInterface | null>
        _id ?: Schema.Types.ObjectId
    }>,
    bio ?: string,
}






type InterfacePlayerDemo = mongoose.Document & IExpert

const expertSchema  = new Schema<IExpert>({




})


export default (mongoose.models.User?.discriminators?.commentator  as mongoose.Model<InterfacePlayerDemo>) || User.discriminator("commentator", expertSchema)





