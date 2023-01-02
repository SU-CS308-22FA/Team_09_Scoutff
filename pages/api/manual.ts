import { NextApiRequest, NextApiResponse } from "next";

import { handleReportMail } from "./cron";

export default async function handler (_req : NextApiRequest, res : NextApiResponse) {

    if (_req.method === "POST") {
       return await  handleReportMail(res)
    }

    else {
        return res.status(405).json({ message: "Method not allowed" })

    }


  



}

