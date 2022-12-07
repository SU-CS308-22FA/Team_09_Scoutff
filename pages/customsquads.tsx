import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
// import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import SquadsCompIndex from "../components/customsquads";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Squads | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SquadsCompIndex />
      </main>
    </div>
  );
}
