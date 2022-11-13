import { Adapter, AdapterUser } from "next-auth/adapters"
import mongoose from "mongoose"

import Account from "../models/Account"
import Session from "../models/Session"
import User from "../models/User"
import VerificationToken from "../models/VerificationToken"



interface MongooseAdapterOptions {
    databaseName: string
}


interface MongooseAdapterProps {
        options: MongooseAdapterOptions
        client: Promise<typeof mongoose>
}


interface ConvertUser {
    name: string
    email: string
    image: string
    role: string
    _id ?: string
    emailVerified: Date | null
}


//function that takes a plain object of mongoose user and returns a plain object of next-auth user
export const userToAdapterUser = (user: ConvertUser | null): AdapterUser => {


    return {
        id: user?._id ?? "",
        name: user?.name ?? "",
        email: user?.email ?? "",
        image: user?.image ?? "",
        role: user?.role ?? "",
        emailVerified: user?.emailVerified ?? null,
        username : "",
    }
}




export default function MongooseAdapter({client,options}  : MongooseAdapterProps) : Adapter<false>{


    return {
        async createUser(user) {

            console.log("create user", user)

            const newUser =  new User(user)
            await newUser.save()
            return userToAdapterUser(newUser)
        },
        async getUser(id) {


            const user = await User.findById(id).lean()
            if (!user) return null

           
            return userToAdapterUser(user)

        },
        async getUserByEmail(email) {



       
            const user = await User.findOne({email}).lean()

            if (!user) return null
            return userToAdapterUser(user)
        },


        async createSession(session) {




            const newSession =  new Session(session)
            await newSession.save()
            return newSession
        },
        async getSessionAndUser(sessionToken) {



 

            const session = await Session.findOne({sessionToken})
            if (!session) return null
            const user = await User.findById(session.userId).lean()
            if (!user) return null
            return {session,user: userToAdapterUser(user)}
        },

        async getUserByAccount(provider_providerAccountId) {

        


            const account = await Account.findOne(provider_providerAccountId)
            if (!account) return null
            const user = await User.findById(account.userId).lean()
            if (!user) return null
            return userToAdapterUser(user)
        },
        async updateUser(user) {

            



            const updatedUser = await User.findByIdAndUpdate(user.id,user,{new: true}).lean()
           
            return userToAdapterUser(updatedUser)
            
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

        async createVerificationToken(data) {

            console.log(data)
            
            const token = await new VerificationToken(data)
            await token.save()
            return token
            
                
               
            },

        async useVerificationToken(data) {
                
                const verificationToken = await VerificationToken.findOneAndDelete({token: data.token})
                if (!verificationToken) return null
                delete verificationToken._id
                return verificationToken
  
        },


   
        
        
    }

    


    
    
}
  
  

  