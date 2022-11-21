import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import UserCompIndex from "../components/user/ui";
import HelpCompIndex from "../components/help/ui";
import { GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export default function Home({csrfToken} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Help | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <HelpCompIndex />

      </main>
    </div>
  );
}

export const getServerSideProps  = async (context : GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const csrfToken = await getCsrfToken(context)







  return {
    props: { 
      csrfToken
     },
  }
}

