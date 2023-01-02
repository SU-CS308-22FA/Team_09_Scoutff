import mongooseConnection from "../mongoose"
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../../models/Applyexpert";
import console from "console";

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
export async function postacceptexpert(applyid : string): Promise<Boolean>
{
    await mongooseConnection();
    
    try {
    await Applyexpert.findByIdAndUpdate(applyid,{
        status : "accepted"
        
    } )
    
    return true
    }
    catch(err)
    {
        return false
    }
}