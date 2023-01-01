import mongoose, { Schema } from "mongoose";

export interface IApplyexpert {
    firstname: string;
    lastname: string;
    email: string;
    pdf: string;
    status: string;
    bio: string;
    _id ?: string;
}

const applyexpertSchema = new Schema<IApplyexpert>({
    firstname: {
        type: String,
        required: true,
        },
    lastname: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        required: true,
        },      
    pdf: {
        type: String,
        required: true,
        },
    status:  {
        type: String,
        default: "pending",
        
        enum: ["pending", "accepted", "rejected"],

    },
    bio: {
        type: String,
        default: "No information provided."
        },
    });
export type IApplyexpert2 = mongoose.Document & IApplyexpert
export default (mongoose.models.Applyexpert as mongoose.Model<IApplyexpert2>)  || mongoose.model("Applyexpert", applyexpertSchema)
