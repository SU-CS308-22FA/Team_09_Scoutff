import mongoose, { Schema } from "mongoose";

interface IUser {
    name: string;
    email: string;
    image: string;
    password: string;
    role: string;
    emailVerified: Date | null;

}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fvectors%2Fsoccer-player-avatar&psig=AOvVaw3EIsK1iTJWeFNyYmNJLfap&ust=1667127936735000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIi_xtWlhfsCFQAAAAAdAAAAABAE"
    },
    
    role:  {
        type: String,
        default: "user",
        
        enum: ["user", "admin", "commentator", "premium"],

    },
    emailVerified: {
        type: Date,
        default: null
    }
})


type InterfaceUser = mongoose.Document & IUser



export default (mongoose.models.User  as mongoose.Model<InterfaceUser>) || mongoose.model("User",userSchema)

