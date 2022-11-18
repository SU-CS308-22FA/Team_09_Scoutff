import { useSession, signIn, signOut } from "next-auth/react"
import { Button, Square } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import SquadsCompIndex from "../components/squads/ui";
import SquareClickable from "../components/objects/squareclickable";

export default function Squadby() {
  return (
    <div>
      <Head>
        <title>Squads By Who? | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
            
        <SquareClickable/>

      </main>
    </div>
  );
}