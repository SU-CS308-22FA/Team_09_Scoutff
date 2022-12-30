import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";
import { getApplyexpert, postApplyexpert } from "../../lib/api/apply_expert";
import dbConnect from "../../lib/mongoose";
import { Types } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const pdf = req.body.pdf


        invariant(firstname, "First name cannot be empty")
        invariant(lastname, "Last name cannot be empty")
        invariant(email, "Email cannot be empty")
        invariant(pdf, "File cannot be empty")
        await dbConnect()

        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")

        console.log(userInfo.sub)

        const author = new Types.ObjectId(userInfo.sub)

        const newApplication = await postApplyexpert({ firstname, lastname, email, pdf })
    
        if (newApplication) return res.status(200).json({ message: "Application added" })

        return res.status(500).json({ message: "Something went wrong" })

    }

    else if (req.method === "GET") {
        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")

       // const comments = await getApplyexpert()

      //  if (comments) return res.status(200).json(comments)

        return res.status(500).json({ message: "Something went wrong" })


    }

    else {
        return res.status(405).json({ message: "Method not allowed" })
    }

}