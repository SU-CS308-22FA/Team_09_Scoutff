import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoose";
import ExpertSquad from "../../models/Expertsquads";

export default async function addExpertSquad(req: NextApiRequest, res: NextApiResponse){

    const {    
        name,
        comment,
        gk,
        gkslug,
        gkphoto,
        lb,
        lbslug,
        lbphoto,
        lcb,
        lcbslug,
        lcbphoto,

        rcb,
        rcbslug,
        rcbphoto,

        rb,
        rbslug,
        rbphoto,

        lcm,
        lcmslug,
        lcmphoto,

        rcm,
        rcmslug,
        rcmphoto,

        cam,
        camslug,
        camphoto,
        
        lw,
        lwslug,
        lwphoto,

        rw,
        rwslug,
        rwphoto,

        st,
        stslug,
        stphoto,
        num} = req.body;

    
    console.log('connecting to mongo')
    await dbConnect()
    console.log('connected to mongo')

    console.log('creating document')
    const expertSquad = await ExpertSquad.create(req.body)
    console.log('created document')

    res.json({expertSquad})


}