import Player from "../../models/Player";
import mongooseConnection from "../mongoose"


export async function getTopFavourites() {

    await mongooseConnection();

    const players = await Player.find().sort({ likedBy: -1 }).limit(10).lean();

    return players;

  }

