import User from "../models/User";
import Player from "../models/Player";
import mongooseConnection from "./mongoose"


export const resolvers = {
    Query: {
        users: async () => {
            await mongooseConnection()
            const users = await User.find();
            return users;
        },
        players: async () => {
            await mongooseConnection()
            const players = await Player.find().limit(10);
            return players;
        },
        player: async (_: any, { slug }: any, context : any) => {
            await mongooseConnection()
            const player = await Player.findOne({ slug});
            return player;
        },
        user : async (_: any, { email }: any) => {
            await mongooseConnection()
            const user = await User.findOne({ email});
            return user;
        },
        likedPlayers: async (_: any, {id} : any) => {
            await mongooseConnection()
            const likedPlayers = await Player.findById(id).populate("likedPlayers").select("likedPlayers -_id");
            return likedPlayers;
        },
    }

}