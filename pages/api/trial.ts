import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";
import { getLikes, postLike } from "../../lib/api/like";
import dbConnect from "../../lib/mongoose";
import { Types } from "mongoose";
import Expert from "../../models/Expert";
import { randomInt } from "crypto";
import { getMatchOfWeek } from "../../lib/api/expert";

export default async function handler(req: NextApiRequest, res: NextApiResponse){



    if (req.method === "GET") {

        await dbConnect();

        const tempExpert = new Expert({
            name : "test",
            email : `test${randomInt(1000)}@bisiler.com`,
            password : "$2y$10$mtN6wgo6MT.m61476yBjquyxhrxF2ubqdy0Gl6L8W.7340s7sJuTC",
            emailVerified : new Date(),
            weeklySquads : {
                "Week1" : [new Types.ObjectId("639f014e36819a563105b73b"), new Types.ObjectId("639f014e36819a563105b73e")],
                "Week2" : [new Types.ObjectId("639f014e36819a563105b74b"), new Types.ObjectId("639f014e36819a563105b74d")],
                "Week3" : [new Types.ObjectId("639f014e36819a563105b751"), new Types.ObjectId("639f014e36819a563105b754")],
                "Week4" : [new Types.ObjectId("639f014e36819a563105b756"), new Types.ObjectId("639f014e36819a563105b758")],

            }

        })


       const savedExpert =  await tempExpert.save()


        const getTeam = await getMatchOfWeek({week : "Week1", expert : savedExpert._id})

        console.log(getTeam)
        

        return res.status(200).json({message : "Success"})

            

    }











}