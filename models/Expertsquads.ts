import mongoose, { Schema, model, models } from "mongoose";


const expertsquadSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    comment: String,
    gk: String,
    gkslug: String,
    gkphoto: String,
    lb: String,
    lbslug: String,
    lbphoto: String,
    lcb: String,
    lcbslug: String,
    lcbphoto: String,

    rcb: String,
    rcbslug: String,
    rcbphoto: String,

    rb: String,
    rbslug: String,
    rbphoto: String,

    lcm: String,
    lcmslug: String,
    lcmphoto: String,

    rcm: String,
    rcmslug: String,
    rcmphoto: String,

    cam: String,
    camslug: String,
    camphoto: String,
    
    lw: String,
    lwslug: String,
    lwphoto: String,

    rw: String,
    rwslug: String,
    rwphoto: String,

    st: String,
    stslug: String,
    stphoto: String,
    num: String
})

const ExpertSquad = models.ExpertSquad || model('ExpertSquad', expertsquadSchema);

export default ExpertSquad;