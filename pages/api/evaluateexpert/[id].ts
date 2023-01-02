import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";
import { Types } from "mongoose";
import {  postacceptexpert, postrejectexpert } from "../../../lib/api/evaluate_expert";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {

        const userInfo = await getToken({ req })
        if (userInfo?.role !== "admin") return res.status(401).json({ message: "Unauthorized" })

        const decision = req.body.decision
        const applyid = req.query.id
        const email = req.body.email

        if (!applyid) return res.status(400).json({ message: "Enter ApplyID" })


        if( decision === "rejected")
        {
            const youarerejected = await postrejectexpert(applyid as string)
        }
        else if( decision === "accepted")
        {
            const youareaccepted = await postacceptexpert(applyid as string, email )
        }
        else
        {
            return res.status(400).json({ message: "Wrong status" })
        }

        return res.status(200).json({message : "Successful change"})
    }

    

    else {
        return res.status(405).json({ message: "Method not allowed" })
    }

}

