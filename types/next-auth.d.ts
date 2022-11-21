import NextAuth from "next-auth"

import { DefaultJWT} from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    name: string
    username: string
    role: string  
    emailVerified : Date | null
  }


}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT  extends DefaultJWT {
    /** OpenID ID Token */
    role : string
    
  } 
}
