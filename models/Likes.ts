import mongoose, { Schema } from "mongoose";

export interface ILike {
    name: String;
    count: number;
}

const likeSchema = new Schema<ILike>({
    name: {
        type: String,
        required: false
    },
    count: {
        type: Number,
        required: false
    },

    
})

export type ILikess = mongoose.Document & ILike


export default (mongoose.models.Like as mongoose.Model<ILikess>)  || mongoose.model('Like', likeSchema)