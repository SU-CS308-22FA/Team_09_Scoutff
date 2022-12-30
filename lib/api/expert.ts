import { ObjectId } from "mongoose";
import Expert from "../../models/Expert";
import Player from "../../models/Player";
import mongooseConnection from "../mongoose"

type weeklyMatchProps = {
    week : string,
    expert : ObjectId
}

const indexToFootballPosition11Players = ["GK","LB","LCB","RCB","RB","LCM","RCM","CAM","LW","RW","ST"] as const;


export async function getAllExperts() {

    await mongooseConnection();

    const experts = await Expert.find().lean();

    return experts;

}

export async function getMatchOfWeek({week,expert} : weeklyMatchProps) {

    await mongooseConnection();



    const weeklyTeam  = await Expert.findById(expert).populate({
        path : `weeklySquads.${week}`,
        model : Player,
        select : "name slug photo"
    }).select(`weeklySquads.${week} -_id`).lean();


    const team = weeklyTeam?.weeklySquads[week];

    const teamWithFootballPositions = team?.map((player,index) => {
        return {
            ...player,
            footballPosition : indexToFootballPosition11Players[index]
        }
    })

    console.log(teamWithFootballPositions)


    


                            

    
    

    return weeklyTeam;


  }

