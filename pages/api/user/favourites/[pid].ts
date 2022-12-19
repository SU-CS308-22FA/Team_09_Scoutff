import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getCsrfToken } from "next-auth/react";
import invariant from "tiny-invariant";
import { addFavourite, removeFavourite } from "../../../../lib/api/user";
import dbConnect from "../../../../lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const csrfToken = await getCsrfToken({ req })


    const pid = req.query.pid


    const playerId = Array.isArray(pid) ? pid[0] : pid


    invariant(playerId, "Player Id cannot be empty")

    invariant(csrfToken === req.body.csrfToken, "Invalid CSRF Token")


    await dbConnect()

    const userInfo = await getToken({ req })

    if (!userInfo) return res.status(401).json({ message: "Unauthorized" })

    invariant(userInfo.sub, "User Id cannot be empty")

    const userId = userInfo.sub

    const convertToStatus = (status: boolean) => status ? res.status(200).json({ message: "Success" }) : res.status(404).json({ message: "User or Player does not exist" })

    

    


    switch (req.method) {
        case "POST":
            return  convertToStatus(await addFavourite({userId, playerId}))
        case "DELETE":
            return convertToStatus(await removeFavourite({userId, playerId}))
        default:
            return res.status(405).json({ message: "Method not allowed" })
    }


}