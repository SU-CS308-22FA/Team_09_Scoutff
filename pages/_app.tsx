import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>

      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
  
}

