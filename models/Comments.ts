import mongoose, { Schema } from "mongoose";

interface IComment {
    comment: string

}

const commentSchema = new Schema<IComment>({
    comment: {
        type: String,
        required: true
    },
    
})

type ICommentt = mongoose.Document & IComment


export default (mongoose.models.Comment  as mongoose.Model<ICommentt>)  || mongoose.model("Comment", commentSchema)