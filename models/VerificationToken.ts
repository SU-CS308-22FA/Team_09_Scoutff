import mongoose, { Schema } from "mongoose";

interface IToken {
    token: string;
    identifier: string;
    expires: Date;

}

const verificationTokenSchema = new Schema<IToken>({
    token: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
})

type InterfaceToken = mongoose.Document & IToken


export default (mongoose.models.VerificationToken  as mongoose.Model<InterfaceToken>)  || mongoose.model("VerificationToken", verificationTokenSchema)