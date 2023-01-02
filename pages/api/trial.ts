import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";
import { getLikes, postLike } from "../../lib/api/like";
import dbConnect from "../../lib/mongoose";
import { Types } from "mongoose";
import Expert from "../../models/Expert";
import { randomInt } from "crypto";
import { getSquadOfWeek } from "../../lib/api/expert";
import ExpertSquad from "../../models/Expertsquads";
import Player from "../../models/Player";
import User from "../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse){



    if (req.method === "GET") {

        await dbConnect();


            

    }











}