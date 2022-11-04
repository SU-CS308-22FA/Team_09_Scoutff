import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema({
    provider : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    },
    providerAccountId : {
        type: String,
        required: true
    },
    access_token : {
        type: String,
        required: true
    },
    token_type : {
        type: String,
        required: true
    },
    scope : {
        type: String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

export default mongoose.models.Account || mongoose.model("Account",AccountSchema)
