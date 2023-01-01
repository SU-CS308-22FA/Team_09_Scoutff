import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import dbConnect from "../../../../../lib/mongoose";
import Expert from "../../../../../models/Expert";
import { getAllSquadOfExpert } from "../../../../../lib/api/expert";

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
                return res.status(404).json({message : "Squad not found"})
            }


      

    
    
            return res.status(200).json(squads)
        }
    
    
        catch (e) {
            console.log(e)
            return res.status(500).json({message : "Something went wrong"})
        }

      
    

    }

    else {
        return res.status(400).json({message : "Bad request"})
    }


  


}

