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
import { InferGetServerSidePropsType } from "next";
import { TypeOf } from "yup";

export default function Home({expertsquads} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Squads | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SquadsCompIndex experts={expertsquads}/>
      </main>
    </div>
  );
}


export const getServerSideProps = async () => {
  try{

    await dbConnect()

    const experts = await Expert.find({}).limit(4).select("name _id").lean();



    const expertsWithTeams = await Promise.all(experts.map(async (expert) => {
      const squad = await getSquadOfWeek({expert: expert._id,weekNumber: 1})
      squad?.team.forEach((team) => {
        if (team._id)
          team._id = team._id.toString();
      });

      
      
      
      return {...expert,_id : expert._id.toString(), squad: squad};
      
    }));
    
    


    return{
      props: {
        expertsquads: expertsWithTeams
      }
    };
  }catch(error){
    console.log(error);
    console.log("ERROR");

    return{notFound: true,}
  }
};