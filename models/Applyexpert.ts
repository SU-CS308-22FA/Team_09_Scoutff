import mongoose, { Schema } from "mongoose";

export interface IApplyexpert {
    filename: string;
    firstname: string;
    lastname: string;
    email: string;
    data: Buffer;
    mimetype: string;
    size: number;
    uploadDate: Date;
}

const applyexpertSchema = new Schema<IApplyexpert>({
    filename: {
        type: String,
        required: true,
        },
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
    data: {
        type: Buffer,
        required: true,
        },
    mimetype: {
        type: String,
        required: true,
        },
    size: {
        type: Number,
        required: true,
        },
    uploadDate: {
        type: Date,
        required: true,
        default: null,
        },
    });
export type IApplyexpert2 = mongoose.Document & IApplyexpert
export default (mongoose.models.Applyexpert as mongoose.Model<IApplyexpert>)  || mongoose.model("Applyexpert", applyexpertSchema)

// const applyexpert = mongoose.model('applyexpert', applyexpertSchema);
//module.exports = applyexpert;