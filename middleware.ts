
const adminPaths = ["/evaluation","/api/manual"]




import { withAuth } from "next-auth/middleware";


export default withAuth({

  callbacks: {
    authorized: ({ req,token }) => {
      if (adminPaths.includes(req.nextUrl.pathname)) {
        return token?.role === "admin";
      }
      

      return !!token;
    }
  },

  



  
  pages: {
    signIn: "/auth/signin",
    
  },

  
});

export const config = { matcher: ["/profile","/evaluation","/api/manual"] }





