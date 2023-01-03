import mongooseConnection from "../mongoose"
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../../models/Applyexpert";
import console from "console";
import { transporter } from "../email/emailData";
import User, { IUser } from "../../models/User";
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

    const email = user.email    

    await application.updateOne({
        status : "accepted"
    })
    

    
    await User.findOneAndUpdate({email}, {
        role : "commentator" , weeklySquads : {}, bio : application.bio
    })

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