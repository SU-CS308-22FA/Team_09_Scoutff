import User from "../../models/User";
import Player from "../../models/Player";
import mongooseConnection from "../mongoose"
import { Resolvers } from './resolvers-types'
import { GraphQLResolveInfo } from "graphql";
import { getToken } from "next-auth/jwt";


const fieldExists = (obj: GraphQLResolveInfo, field: string) => {
    return obj?.fieldNodes?.at(0)?.selectionSet?.selections.some((selection) => {
        return (selection as any).name.value === field;
    });
};

const pages = {
    defaultPageCount: 10,
    maxPageCount: 25
}




export const resolvers : Resolvers = {
    Query: {
        player : async (parent, {slug}, context, info) => {
            await mongooseConnection()

            const likedByExist = fieldExists(info, "likedBy")

            
            const foundPlayer =  Player.findOne({slug})

            
            
            return await (likedByExist ? foundPlayer.populate("likedBy") : foundPlayer).lean()
        },
        
        players: async (parent,{sort,skip,take},context,info) => {
            await mongooseConnection()
            const likedByExist = fieldExists(info, "likedBy")

            const foundPlayers =  Player.find()

            return await (likedByExist ? foundPlayers.populate("likedBy") : foundPlayers).skip(skip ?? 0).limit(Math.min(take ?? pages.defaultPageCount,pages.maxPageCount)).sort(`-${sort}`).lean()
        },
        user: async (parent, { email },context,info) => {
            await mongooseConnection()

            const token = await getToken({ req: context.req})


            if(token?.email !== email && token?.role !== "admin") {
                return null
            }





            const likedPlayersExist = fieldExists(info, "likedPlayers")

            const foundUser = User.findOne({ email })

            return await (likedPlayersExist ? foundUser.populate("likedPlayers") : foundUser).lean()
        },
        users: async (parent,{sort,skip,take},context,info) => {
            await mongooseConnection()

            const token = await getToken({ req: context.req})


            if(token?.role !== "admin") {
                return null
            }



            const likedPlayersExist = fieldExists(info, "likedPlayers")


            const foundUsers = User.find()


            return await (likedPlayersExist ? foundUsers.populate("likedPlayers") : foundUsers).skip(skip ?? 0).limit(Math.min(take ?? pages.defaultPageCount,pages.maxPageCount)).sort(`-${sort}`).lean()

        },
        
    },


}