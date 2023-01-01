import mongooseConnection from "../mongoose"
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../../models/Applyexpert";
import console from "console";
import { transporter } from "../email/emailData";
import Player from "../../models/Player";
import User from "../../models/User";
export async function postrejectexpert(applyid : string): Promise<Boolean>
{
    await mongooseConnection();
    
    try {
    await Applyexpert.findByIdAndUpdate(applyid,{
        status : "rejected"
        
    } )
    
    return true
    }
    catch(err)
    {
        return false
    }
}
export async function postacceptexpert(applyid : string, email: string): Promise<Boolean>
{
    console.log(email)
    await mongooseConnection();
    
    try {
    await Applyexpert.findByIdAndUpdate(applyid,{
        status : "accepted"
        
    } )
    
    await User.findOneAndUpdate({email}, {
        role : "commentator" , weeklySquads : {}
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