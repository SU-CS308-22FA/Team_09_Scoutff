import NextAuth, { unstable_getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongoose";
import MongooseAdapter from "../../../adapters/MongooseAdapter";
import bcrypt from "bcrypt"
import User from "../../../models/User";


import GoogleProvider from "next-auth/providers/google"
import invariant from "tiny-invariant";
import { decode, getToken } from "next-auth/jwt";




export default NextAuth({
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


    
  
  }
  ,
  
    providers: [
      CredentialsProvider({
        id : "login",
        name: 'Login',

        credentials: {
          email: { label: "Email", type: "text", placeholder: "futbolcu@deneme.edul.bar" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          invariant(credentials, "Credentials must be provided")


          //invariant control
          invariant(credentials.email, "Email cannot be empty")
          invariant(credentials.password, "Password cannot be empty")

          const user = await User.findOne({ email: credentials.email });



          invariant(user, "User not found")


          invariant(user.password, "Password not found")












          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return user;
          }
            
        
          

     
          // Return null if user data could not be retrieved
          return null
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

          invariant(credentials, "Credentials must be provided")


          //invariant control
          invariant(credentials.email, "Email cannot be empty")
          invariant(credentials.password, "Password cannot be empty")
          invariant(credentials.name, "Name cannot be empty")

          //todo better mail validation
          invariant(credentials.email.includes("@"), "Email must be valid") 

            const user = await User.findOne({ email: credentials.email });

            invariant(!user, "User already exists")

            credentials.password = await bcrypt.hash(credentials.password, 8);


            const {name, email, password} = credentials
           
            const newUser = new User({name,email,password});
            await newUser.save();
            return newUser;
          
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


          invariant(credentials, "Credentials must be provided")



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

          
        







          invariant(rawJwt, "JWT must be provided")

          //decode url encoded 
          const jwt = decodeURIComponent(rawJwt)




         const token =  await decode({
            secret: process.env.NEXTAUTH_SECRET ?? "",
            token: jwt,
          
          })

          console.log(token)
         
          invariant(token, "Token must be provided")
          invariant(token.email, "Token does not contain email")


         
    
          



          //Hash password if it is not empty
          if (update.password) {
            update.password = await bcrypt.hash(update.password, 8);
          }


        
          const user = await User.findOneAndUpdate({email: token.email}, update, {new: true});

          return user;

          

        }
      }),



      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),

      

      
    
    ]
  })

