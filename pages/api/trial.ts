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

export default async function handler(req: NextApiRequest, res: NextApiResponse){



    if (req.method === "GET") {

        await dbConnect();

        await Expert.remove({});

        const tempExpert = new Expert({
            name : "Erman Yasar",
            email : `test${randomInt(1000)}@bisiler.com`,
            password : "$2y$10$mtN6wgo6MT.m61476yBjquyxhrxF2ubqdy0Gl6L8W.7340s7sJuTC",
            emailVerified : new Date(),
            image : "https://www.macfit.com.tr/wp-content/uploads/2022/09/PHOTO-2021-12-16-17-56-13.png",
            weeklySquads : {
                week1 : {
                    comment : "test",
                    players : [
                        "639f014e36819a563105b8b3", 
                        "639f014e36819a563105b8fe",
                        "639f014e36819a563105b8be",
                        "639f014e36819a563105b8f7",
                        "639f014e36819a563105b8b6",
                        "639f014e36819a563105b8f0",
                        "639f014e36819a563105b8df",
                        "639f014e36819a563105bac3",
                        "639f014e36819a563105b8ec",
                        "639f014e36819a563105b8ed",
                        "639f014e36819a563105b8ba"
                    ].map((id) => new Types.ObjectId(id))
                }
            }

        })


       const savedExpert =  await tempExpert.save()


        const getTeam = await getSquadOfWeek({weekNumber : 1, expert : savedExpert._id})

        console.log(getTeam)
        

        return res.status(200).json({message : "Success"})

            

    }











}