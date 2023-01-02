import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import {generateWeeklyReports} from "../../lib/email/emailData";
import dbConnect from "../../lib/mongoose";
import { handleReportMail } from "./cron";

export default async function handler (_req : NextApiRequest, res : NextApiResponse) {

    if (_req.method === "POST") {
       await  handleReportMail(res)
        return res.status(200).json({message : "success"})
    }

    else {
        return res.status(405).json({ message: "Method not allowed" })

    }


  



}

