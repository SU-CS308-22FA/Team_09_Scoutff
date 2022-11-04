import mongoose, { Schema } from "mongoose"

const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    sessionToken: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }
})

export default mongoose.models.Session || mongoose.model("Session",SessionSchema)