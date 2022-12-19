import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";
import { getLikes, postLike } from "../../lib/api/like";
import dbConnect from "../../lib/mongoose";
import { Types } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if (req.method === "POST") {
        

        const word = req.body.name

        invariant(word, "Like cannot be empty")

        await dbConnect()
        

        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")

        console.log(userInfo.sub)



        const newLike = await postLike(word)

        return newLike
        




    }

    else if (req.method === "GET") {

        const word = req.body.name

        invariant(word, "Like cannot be empty")

        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")

        const likes = await getLikes(word)

        return likes


    }

    else {
        return res.status(405).json({ message: "Method not allowed" })
    }











}