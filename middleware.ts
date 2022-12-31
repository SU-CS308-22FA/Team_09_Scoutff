
export const config = { matcher: ["/evaluation","/profile"] }


import { withAuth } from "next-auth/middleware";


export default withAuth({

  callbacks: {
    authorized: ({ req,token }) => {
      if (req.nextUrl.pathname === "/evaluation") {
        return token?.role === "admin";
      }
      return !!token;
    }
  },




  
  pages: {
    signIn: "/auth/signin",
    
  },
  
});




