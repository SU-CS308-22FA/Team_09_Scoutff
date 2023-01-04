import mongooseConnection from "../mongoose"
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../../models/Applyexpert";
import console from "console";
import User from "../../models/User";

export async function postApplyexpert(application : IApplyexpert): Promise<IApplyexpert2>
{
    await mongooseConnection();

    const user = await User.findById(application.user);

    if (user?.role === "commentator") {
        throw new Error("You are already a commentator");
    }

    

    const existingApplication = await Applyexpert.exists({
        user : application.user,
        status : "pending"
    })

    console.log(existingApplication)

    if(existingApplication)
    {
        throw new Error("You already have a pending application");
    }

    
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