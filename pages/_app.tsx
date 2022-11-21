import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  // Reset the user access token in cookies on a regular interval



  return (
    <SessionProvider session={session}>

    
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>

    </SessionProvider>
  );
  
}



