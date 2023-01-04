import { useChakra } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useApp } from "../../hook/useApp";
import { GraphQLProvider } from "../../provider/GraphQLProvider";
import Navbar from "./navbar/navbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();


  const session = useSession();




  const chakra = useChakra();


  if (session.status === "loading") {
    return <div>Loading...</div>;
  }







  return (
    <GraphQLProvider>
    <>
      {/* Exclude urls starting with /auth */}
      {!router.pathname.startsWith("/auth") && <Navbar />}
      {children}
    </>
  </GraphQLProvider>
    

  

  );
};

export default Layout;