import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";
import { getApplyexpert, postApplyexpert } from "../../lib/api/apply_expert";
import dbConnect from "../../lib/mongoose";
import { Types } from "mongoose";
import { createHash } from "crypto"; 

import {v2} from "cloudinary"

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.CLOUDINARY_SECURE === "true",
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {

        console.log("POST")
        const pdf = req.body.pdf
        const bio = req.body.bio

        const user = await getToken({ req })

        const email = user?.email
        const status = "pending"
        
        let pdfLink

        invariant(email, "Email cannot be empty")
        invariant(pdf, "File cannot be empty")
        await dbConnect()

        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")


        //get sha256 hash of email
        const hash = createHash('sha256');
        hash.update(email);
        const hashemail = hash.digest('hex');


        //hash email 


        //filename consits of email and timestamp
        const fileName = `${userInfo.sub}-${hash}.pdf`


            
        try {
            const {secure_url} = await v2.uploader.upload(pdf, {
            folder: "expert_application",
            resource_type: "raw",
            public_id : fileName,
            unique_filename: false,
            overwrite: true,
            allowed_formats: ["pdf"],
            
 
            })

            pdfLink = secure_url

        

        }
        catch (err) {
           return res.status(500).json({message: "fİle upload failed"})
        }
  
          

        const newApplication = await postApplyexpert({ user : userInfo.sub ,pdf : pdfLink, status, bio})
    
        if (newApplication) return res.status(200).json({ message: "Application added" })

        return res.status(500).json({ message: "Something went wrong" })

    }

    else if (req.method === "GET") {
        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")

       const applications = await getApplyexpert()

       if (applications) return res.status(200).json(applications)

        return res.status(500).json({ message: "Something went wrong" })


    }

    else {
        return res.status(405).json({ message: "Method not allowed" })
    }

}

//set file size limit to 2mb
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "2mb",
        },
    },
};
