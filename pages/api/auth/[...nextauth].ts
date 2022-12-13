import NextAuth, { NextAuthOptions, unstable_getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";

import clientPromise from "../../../lib/mongoose";
import MongooseAdapter from "../../../adapters/MongooseAdapter";
import bcrypt from "bcrypt"
import User from "../../../models/User";


import GoogleProvider from "next-auth/providers/google"
import { decode, getToken } from "next-auth/jwt";

import { userToAdapterUser } from "../../../adapters/MongooseAdapter";
import { sign } from "crypto";
import { signIn } from "next-auth/react";



export const authOptions :  NextAuthOptions = {
  adapter: MongooseAdapter({client: clientPromise(), options: {databaseName: "login"}}),

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  
  callbacks: {
   
    async jwt({token, user}) {
    
      if (user) {
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },

    

    async signIn({user, account, profile, email, credentials}) {

      //get baseurl from request
      const baseUrl = (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ?? process.env.NEXTAUTH_URL
      const errorPage = `${baseUrl}/error?error=EmailNotVerified`

      const userNotExist = `${baseUrl}/error?error=UserNotExist`

      const verificationRequest = email?.verificationRequest


      if (verificationRequest) 
          return await User.exists({email: user.email}) ? true : userNotExist
      

        
      //update user if email is verified
      if (!user.emailVerified  && account?.provider === "email") {
        const {email} = user
        user = await User.findOneAndUpdate({email}, {emailVerified: new Date()}, {new: true}).lean()
      }







      return user?.emailVerified ? true : errorPage

      

    }


    
  
  },
  
  
  pages: {
    signIn: "/auth/signin",
    signOut: "/api/auth/signout",
    error: "/api/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/api/auth/verify-request", // (used for check email message)
    newUser: "/profile" // If set, new users will be directed here on first sign in
  },

  


  

  
  
    providers: [
      EmailProvider({
        server : {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_FROM,
        normalizeIdentifier: (identifier) => identifier.toLowerCase(),
        
        
        
      }),

      CredentialsProvider({
        id : "login",
        name: 'Login',

        credentials: {
          email: { label: "Email", type: "text", placeholder: "futbolcu@deneme.edul.bar" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {



          await clientPromise()
          if (!credentials?.email || !credentials?.password) throw new Error('Please enter all fields')
          

          const user = await User.findOne({ email: credentials.email }).lean();



          if (!user) throw new Error('No user with that exists')



          if (!user?.password)  throw new Error('That user has no password')


          















          const isValid = await bcrypt.compare(credentials.password, user.password);


          if (!isValid) throw new Error('Invalid password or email')
          

  
          

     
          return  userToAdapterUser(user);
        }
      }),
      CredentialsProvider({
        id : "register",
        name: 'Register',
        credentials: {
          name: { label: "Name", type: "text", placeholder: "Futbolcu" },
          email: { label: "Email", type: "text", placeholder: "futbolcu@deneme.edul.bar" },
          password: {  label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          await clientPromise()



          

          if (!credentials?.email) throw new Error("Email cannot be empty")
          if (!credentials?.password) throw new Error("Password cannot be empty")
          if (!credentials?.name) throw new Error("Name cannot be empty")
          if (!credentials?.email.includes("@")) throw new Error("Email must be valid")
          


         

            const user = await User.findOne({ email: credentials!.email });


            if (user) throw new Error("User already exists")


            credentials!.password = await bcrypt.hash(credentials!.password, 8);


            const {name, email, password} = credentials!;
           
            const newUser = new User({name,email,password});
            await newUser.save();

            



            return userToAdapterUser(newUser);
          
        }
      }),
      CredentialsProvider({
        id :"update-account",
        name: 'Update Account',
  
        

        credentials: {
          name: { label: "Name", type: "text", placeholder: "" },
          password: {  label: "Password", type: "password" },
        },
        
        async authorize(credentials,req) {
          await clientPromise()



          if (!credentials) throw new Error("Credentials cannot be empty")




          //Get only not empty values from credentials
          //Ignore other credentials
          const {name,password} = credentials
          
          const update = {name,  password}







          //Remove empty values
          for (const [key,value] of Object.entries(update)) {

            if (!value) {
              const typedKey = key as keyof typeof update
              delete update[typedKey]
          }
        }





        const cookies = req.headers?.cookie.split(";")
        const sessionCookie = cookies?.find((cookie : String) => cookie.includes("next-auth.session-token"))

        const rawJwt = sessionCookie?.split("=")[1]

          
        




        if (!rawJwt) throw new Error("No session cookie found")




          //decode url encoded 
          const jwt = decodeURIComponent(rawJwt)




         const token =  await decode({
            secret: process.env.NEXTAUTH_SECRET ?? "",
            token: jwt,
          
          })


          if (!token) throw new Error("Token is not valid")
          if (!token?.email) throw new Error("Token is not valid")
         


         
    
          



          //Hash password if it is not empty
          if (update.password) {
            update.password = await bcrypt.hash(update.password, 8);
          }


        
          const user = await User.findOneAndUpdate({email: token.email}, update, {new: true}).lean();


        


          

          return userToAdapterUser(user);

          

        }
      }),



      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),

      

      
    
    ]
  }



export default NextAuth(authOptions)

