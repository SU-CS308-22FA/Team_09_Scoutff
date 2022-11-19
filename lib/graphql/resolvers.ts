import User from "../../models/User";
import Player from "../../models/Player";
import mongooseConnection from "../mongoose"
import { Resolvers } from './resolvers-types'
import { GraphQLResolveInfo } from "graphql";


const fieldExists = (obj: GraphQLResolveInfo, field: string) => {
    return obj?.fieldNodes?.at(0)?.selectionSet?.selections.some((selection) => {
        return (selection as any).name.value === field;
    });
};

export const resolvers : Resolvers = {
    Query: {
        player : async (parent, {slug}, context, info) => {
            await mongooseConnection()

            const likedByExist = fieldExists(info, "likedBy")

            
            const foundPlayer =  Player.findOne({slug})

            
            
            return await (likedByExist ? foundPlayer.populate("likedBy") : foundPlayer).lean()
        },
        
        players: async (parent,arg,context,info) => {
            await mongooseConnection()
            const likedByExist = fieldExists(info, "likedBy")

            const foundPlayers =  Player.find()

            return await (likedByExist ? foundPlayers.populate("likedBy") : foundPlayers).limit(10).lean()
        },
        user: async (parent, { email },context,info) => {
            await mongooseConnection()
            const likedPlayersExist = fieldExists(info, "likedPlayers")

            const foundUser = User.findOne({ email })

            return await (likedPlayersExist ? foundUser.populate("likedPlayers") : foundUser).lean()
        },
        users: async (parent,arg,context,info) => {
            await mongooseConnection()

            const likedPlayersExist = fieldExists(info, "likedPlayers")


            const foundUsers = User.find()


            return await (likedPlayersExist ? foundUsers.populate("likedPlayers") : foundUsers).limit(10).lean();
        },
        
        
    },
    Player: {
        
    },
    User: {
    }


}