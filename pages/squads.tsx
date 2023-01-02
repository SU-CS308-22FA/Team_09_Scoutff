import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import SquadsCompIndex from "../components/squads/ui";
import dbConnect from "../lib/mongoose";
import ExpertSquad from "../models/Expertsquads";
import Expert from "../models/Expert";
import { getSquadOfWeek } from "../lib/api/expert";

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
    await dbConnect()

    const experts = await Expert.find({}).select("name _id").lean();

    experts.forEach((expert) => {
      expert._id = expert._id.toString();

    });
    

    await Promise.all(experts.map(async (expert) => {
      const squad = await getSquadOfWeek({weekNumber : 1,expert: expert._id});
    }))


    



    

    

    
  
  

    return{
      props: {
        expertsquads: experts
      }
    };
  }catch(error){
    console.log(error);
    console.log("ERROR");

    return{notFound: true,}
  }
};