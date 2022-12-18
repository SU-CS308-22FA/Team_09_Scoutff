import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import {generateWeeklyReports} from "../../lib/email/emailData";
import dbConnect from "../../lib/mongoose";

async function handler (_req : NextApiRequest, res : NextApiResponse) {

    try {
        await dbConnect();
        await generateWeeklyReports();
        return res.status(200).json({message : "Success"})
    }


    catch (e) {
        console.log(e)
        return res.status(500).json({message : "Something went wrong"})
    }

  


}

export default verifySignature(handler);

export const config = {
    api: {
        bodyParser: false,
    },
};

