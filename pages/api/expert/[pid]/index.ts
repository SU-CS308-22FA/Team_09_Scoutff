import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import dbConnect from "../../../../lib/mongoose";
import Expert from "../../../../models/Expert";

export default async function handler (_req : NextApiRequest, res : NextApiResponse) {


    

    if (_req.method === "GET") {
        const pid = _req.query.pid


        try {
            await dbConnect();
            

            const expert = await Expert.findById({pid}).select("image  name   _id").lean();

            if (!expert) {
                return res.status(404).json({message : "Expert not found"})
            }
        
           


            expert._id = expert._id.toString();
    
    
            return res.status(200).json({expert})
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

