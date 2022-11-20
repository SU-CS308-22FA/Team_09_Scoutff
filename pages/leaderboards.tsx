
import Head from "next/head";
import React from "react";

import LBCompIndex from "../components/leaderboard/ui";
import { InferGetStaticPropsType } from "next";

type MarketValueRanking = {
  name: string;
  marketValue: number;
};

type RatingRanking = {
  name: string;
  rating: number;
};


type GraphQLResponse<T>= {
  data: {
    players: Array<T>;
  };
};











export default function Home() : InferGetStaticPropsType<typeof getStaticProps> {


  
  return (
    <div>
      <Head>  
        <title>Leaderboards | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <LBCompIndex />

      </main>
    </div>
  );
}

export const getStaticProps = async () => {

  

  
  




  return {
    props: {
     


     
      
      

  
    
    }
  }
}