import { Adapter } from "next-auth/adapters"
import mongoose from "mongoose"

import Account from "../models/Account"
import Session from "../models/Session"
import User from "../models/User"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import dbConnect from "../lib/mongoose"

interface MongooseAdapterOptions {
    databaseName: string
}

MongoDBAdapter
interface MongooseAdapterProps {
        options: MongooseAdapterOptions
        client: Promise<typeof mongoose>
}


export default function MongooseAdapter({client,options}  : MongooseAdapterProps) : Adapter<false>{


    return {
        async createUser(user) {

            const newUser =  new User(user)
            await newUser.save()
            return newUser
        },
        async getUser(id) {


            const user = await User.findById(id)
            if (!user) return null
            return user
        },
        async getUserByEmail(email) {



       
            const user = await User.findOne({email})

            if (!user) return null
            return user
        },


        async createSession(session) {


            const newSession =  new Session(session)
            await newSession.save()
            return newSession
        },
        async getSessionAndUser(sessionToken) {



            const session = await Session.findOne({sessionToken})
            if (!session) return null
            const user = await User.findById(session.userId)
            if (!user) return null
            return {session,user}
        },

        async getUserByAccount(provider_providerAccountId) {

        


            const account = await Account.findOne(provider_providerAccountId)
            if (!account) return null
            const user = await User.findById(account.userId)
            if (!user) return null
            return user
        },
        async updateUser(user) {


            console.log("updateUser",user)

            const updatedUser = await User.findByIdAndUpdate(user.id,user,{new: true})
            if (!updatedUser) return null
            return updatedUser
        },
        async updateSession(session) {


            const updatedSession = await Session.findOneAndUpdate({sessionToken: session.sessionToken},session,{new: true})
            if (!updatedSession) return null
            return updatedSession
        },
        async deleteSession(sessionToken) {

            
            const deletedSession = await Session.findOneAndDelete({sessionToken})
            if (!deletedSession) return null
            return deletedSession


        },
        async linkAccount(data) {

      
            
            const account = await new Account(data)
            await account.save()
            return account
        },

   

     
        
    }

    


    
    
}
  
  

  