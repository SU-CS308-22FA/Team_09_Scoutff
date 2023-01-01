import { NextApiRequest, NextApiResponse } from "next";

import {  getSquadOfWeek } from "../../../../../lib/api/expert";

const seasonWeeks = 38;

export default async function handler (_req : NextApiRequest, res : NextApiResponse) {



    if (_req.method === "GET") {

        const pid = _req.query.pid
        const week = _req.query.week



        try {

            if (!pid) {
                return res.status(404).json({message : "Expert not found"})
            }

            if (!week) {
                return res.status(404).json({message : "Week not found"})
            }

            const weekAsNumber = Number(week)

            if (!weekAsNumber || weekAsNumber < 1 || weekAsNumber > seasonWeeks) {
                return res.status(404).json({message : "Week not found"})
            }




            

            const result  = await getSquadOfWeek({
                expert : pid as string,
                weekNumber : weekAsNumber
            })





            

           
  
            if (!result || result.team.length  === 0) {
                return res.status(404).json({message : "Squad not found"})
            }


      

    
    
            return res.status(200).json(result)
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

