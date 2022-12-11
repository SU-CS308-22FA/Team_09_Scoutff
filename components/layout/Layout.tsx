import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { GraphQLProvider } from "../../provider/GraphQLProvider";
import Navbar from "./navbar/navbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();
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