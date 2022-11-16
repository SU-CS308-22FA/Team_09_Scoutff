import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Navbar from "./navbar/navbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  return (
    <>
      {/* Exclude urls starting with /auth */}
      {!router.pathname.startsWith("/auth") && <Navbar />}
      {children}
    </>
  );
};

export default Layout;