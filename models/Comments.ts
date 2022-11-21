import mongoose, { Schema } from "mongoose";

export interface IComment {
    comment: string;
    author : mongoose.Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
})

export type ICommentt = mongoose.Document & IComment


export default (mongoose.models.Comment as mongoose.Model<ICommentt>)  || mongoose.model("Comment", commentSchema)