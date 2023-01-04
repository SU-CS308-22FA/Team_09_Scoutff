import mongooseConnection from "../mongoose"
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../../models/Applyexpert";
import console from "console";
import User, { IUser } from "../../models/User";
import nodemailer from "nodemailer";
import Expert from "../../models/Expert";


export const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER, // generated ethereal user
      pass: process.env.EMAIL_SERVER_PASSWORD // generated ethereal password
    },
  });


export async function postrejectexpert(applyid : string): Promise<Boolean>
{
    await mongooseConnection();
    
    try {



    const application = await Applyexpert.findById(applyid).populate("user")
    



    //if it is not pending, return false
    if(application?.status !== "pending" || !application.user)
    {
        return false
    }

    const user = application.user as IUser

    if (user.role === "commentator") {
        return true;
    }

    const email = user.email


    await application.updateOne({
        status : "rejected"
    })



    const info = transporter.sendMail({
        from : '"Scoutff Football" <bisiler@scoutff.com>',
        to : email,
        subject : "Your expert application is rejected",
        text : "Your application is rejected. Please try again later."
        
    })

    return true
    }
    catch(err)
    {
        return false
    }
}
export async function postacceptexpert(applyid : string): Promise<Boolean>
{
    await mongooseConnection();
    
    try {


    const application = await Applyexpert.findById(applyid).populate("user")

    //if it is not pending, return false
    if(application?.status !== "pending" || !application.user)
    {
        return false
    }


    const user = application.user as IUser


    if (user.role === "commentator") {
        return true;
    }



    const email = user.email    
    
    
    const session = await mongooseConnection().then(mongoose => mongoose.startSession());
    session.startTransaction();


    await Promise.all([
        application.updateOne({
            status : "accepted"
        }),

        User.findByIdAndUpdate(user._id,{
            role : "commentator",
            bio : application.bio,
            weeklySquads : {},

            })
                    
                    

        
       
    ])





    await session.commitTransaction();
    session.endSession();

    
  


    const info = transporter.sendMail({
        from : '"Scoutff Football" <bisiler@scoutff.com>',
        to : email,
        subject : "Congratulations, you are now an expert",
        text : "If you are already logged in, please log out and try logging in again to refresh your role status."
        
    })

    return true
    }
    catch(err)
    {
        return false
    }
}