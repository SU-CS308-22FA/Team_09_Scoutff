import mongooseConnection from "../mongoose"
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../../models/Applyexpert";
import console from "console";

export async function postApplyexpert(application : IApplyexpert): Promise<IApplyexpert2>
{
    await mongooseConnection();
    
    const newApplication = await Applyexpert.create(application);

    return newApplication;

}

export async function getApplyexpert(): Promise<IApplyexpert[]> {

    await mongooseConnection();

    const applyexperts = await Applyexpert.find({
        status  : "pending"
    }).populate("user","-_id email name ").lean();


    

    return applyexperts;

  }