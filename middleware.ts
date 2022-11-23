
export const config = { matcher: ["/dashboard","/profile"] }


import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});