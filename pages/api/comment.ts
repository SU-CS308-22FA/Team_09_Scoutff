import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";
import { getComments, postComment } from "../../lib/api/comment";
import dbConnect from "../../lib/mongoose";
import { Types } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const comment = req.body.comment


        invariant(comment, "Comment cannot be empty")

        await dbConnect()

        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")

        console.log(userInfo.sub)

        const author = new Types.ObjectId(userInfo.sub)


        const newComment = await postComment({ comment, author })

        


        if (newComment) return res.status(200).json({ message: "Comment added" })

        return res.status(500).json({ message: "Something went wrong" })


    }

    else if (req.method === "GET") {
        const userInfo = await getToken({ req })

        if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

        invariant(userInfo.sub, "User Id cannot be empty")

        const comments = await getComments()

        if (comments) return res.status(200).json(comments)

        return res.status(500).json({ message: "Something went wrong" })


    }

    else {
        return res.status(405).json({ message: "Method not allowed" })
    }











}