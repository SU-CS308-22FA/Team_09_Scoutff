import mongooseConnection from "../mongoose"
import console from "console";
import Likes, { ILike, ILikess } from "../../models/Likes";


export async function postLike(namer : String): Promise<Boolean> {

    await mongooseConnection();
    const filter = {name: namer}
    const update = {count: 31}
    const increment= {$inc: { count: 1 }}
    const myLike = await Likes.updateOne(filter, increment);
    
    
    console.log(myLike)

    return myLike.acknowledged

  }


  export async function getLikes(namer : String) {

    await mongooseConnection();
    const filter = {name: namer}

    const likes = await Likes.findOne(filter);
    return likes?.count
    

  }
