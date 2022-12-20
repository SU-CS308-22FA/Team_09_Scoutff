import mongoose, { Schema, model, models } from "mongoose";


const expertsquadSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    comment: String,
    gk: String,
    lb: String,
    lcb: String,
    rcb: String,
    rb: String,
    lcm: String,
    rcm: String,
    cam: String,
    lw: String,
    rw: String,
    st: String,
    num: String
})

const ExpertSquad = models.ExpertSquad || model('ExpertSquad', expertsquadSchema);

export default ExpertSquad;