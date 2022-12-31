import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import Head from "next/head";
import React from "react";
import UserCompIndex from "../components/user/ui";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { ParsedUrlQuery } from "querystring";

export default function Home({name,csrfToken,role} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>My Profile | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <UserCompIndex  name={name ?? ""} csrfToken={csrfToken ?? ""} role={role ?? "user"} />

      </main>
    </div>
  );
}



export  const getServerSideProps  = async (context : GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const session = await unstable_getServerSession(context.req, context.res,authOptions)
  const csrfToken = await getCsrfToken(context)




  

  
  return {
      props: { 
        name : session?.user?.name,
        role : session?.user?.role,
        csrfToken: csrfToken,
       },
  }
  }
