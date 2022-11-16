import User from "../../models/User";
import Player from "../../models/Player";
import mongooseConnection from "../mongoose"

import { IPlayer } from "../../models/Player";

interface IAddFavPlayer {
    userId: string;
    playerId: string;
}

export async function addFavourite({userId,playerId} : IAddFavPlayer): Promise<boolean> {


  
     const session = await mongooseConnection().then(mongoose => mongoose.startSession());
     session.startTransaction();
 
     try {
         await Promise.all([
             User.findByIdAndUpdate(userId, {
                 $addToSet: {
                     likedPlayers: playerId
                     }
                 }).then(user => user ? Promise.resolve() : Promise.reject("User not found")),

             Player.findByIdAndUpdate(playerId, {
                 $addToSet: {
                     likedBy: userId
                     }
                 }).then(player => player ? Promise.resolve() : Promise.reject("Player not found"))
         ])
         await session.commitTransaction();
         session.endSession();
         return true;
 
     }
     catch (error) {
         await session.abortTransaction();
         session.endSession();
         return false;
     }
 
  
  

  
  }

  export async function removeFavourite({userId,playerId} : IAddFavPlayer): Promise<boolean> {


    
    const session = await mongooseConnection().then(mongoose => mongoose.startSession());
    session.startTransaction();

    try {
        await Promise.all([
            User.findByIdAndUpdate(userId, {
                $pull: {
                    likedPlayers: playerId
                    }
                }).then(user => user ? Promise.resolve() : Promise.reject("User not found")),

            Player.findByIdAndUpdate(playerId, {
                $pull: {
                    likedBy: userId
                    }
                }).then(player => player ? Promise.resolve() : Promise.reject("Player not found"))
        ])
        await session.commitTransaction();
        session.endSession();
        return true;

    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return false;
    }



  }



export async function getUserFavourites({userId} : {userId: string}) {

    await mongooseConnection();

    const user = await User.findById(userId)
                        .populate("likedPlayers","name -_id")
                        .select("likedPlayers -_id")

                        user?.likedPlayers
    
    const likedPlayers : Array<String> = (user?.likedPlayers ?? []).map((player)  => player.name);

                        

    

    return likedPlayers;
}