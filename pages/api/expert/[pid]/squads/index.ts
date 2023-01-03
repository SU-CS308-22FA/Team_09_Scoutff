import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import dbConnect from "../../../../../lib/mongoose";
import Expert from "../../../../../models/Expert";
import { createSquadOfExpert, getAllSquadOfExpert } from "../../../../../lib/api/expert";
import { getToken } from "next-auth/jwt";

const seasonWeeks = 38;


export default async function handler (_req : NextApiRequest, res : NextApiResponse) {



    if (_req.method === "GET") {

        const pid = _req.query.pid




        try {

            if (!pid) {
                return res.status(404).json({message : "Expert not found"})
            }
            


            const result  = await getAllSquadOfExpert(pid as string)



            const squads = result?.weeklySquads;


            

           
  
            if (!squads || Object.keys(squads).length  === 0) {
                return  res.status(200).json(null)
            }




      

    
    
            return res.status(200).json(squads)
        }
    
    
        catch (e) {
            console.log(e)
            return res.status(500).json({message : "Something went wrong"})
        }

      
    

    }

    else if (_req.method === "POST") {
        const members = _req.body.members as string[];
        const comment = _req.body.comment as string;
        const pid = _req.query.pid as string;
        const week = _req.body.week as string;

        const user = await getToken({req : _req, secret : process.env.JWT_SECRET})
        



        if (user?.sub !== pid && user?.role !== "admin") {
            return res.status(401).json({message : "Unauthorized"})
        }


        const weekAsNumber = Number(week)

        if (!members ||  !weekAsNumber || weekAsNumber < 1 || weekAsNumber > seasonWeeks) {
            return res.status(400).json({message : "Bad request"})
        }

        await createSquadOfExpert({
            weekNumber : weekAsNumber,
            expert : pid,
            comment,
            players : members
        })
        

        return res.status(200).json({message : "Success"})




    }

    else {
        return res.status(400).json({message : "Bad request"})
    }


  


}

