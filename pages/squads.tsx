import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import SquadsCompIndex from "../components/squads/ui";
import dbConnect from "../lib/mongoose";
import ExpertSquad from "../models/Expertsquads";
import { InferGetServerSidePropsType } from "next";

export default function Home({expertsquads} : any) {
  return (
    <div>
      <Head>
        <title>Squads | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SquadsCompIndex data={expertsquads}/>
      </main>
    </div>
  );
}


export const getServerSideProps = async () => {
  try{
    console.log('connecting to mongo')
    await dbConnect()
    console.log('connected to mongo')

    console.log('Fetching document')
    const expertsquads = await ExpertSquad.find().sort({$natural: -1 }).limit(1)
    console.log('Fetched document')

    return{
      props: {
        expertsquads: JSON.parse(JSON.stringify(expertsquads))
      }
    };
  }catch(error){
    console.log("ERROR NOOOOOOOOOOOO");

    return{notFound: true,}
  }
};