import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import UserCompIndex from "../components/user/ui";
import LBCompIndex from "../components/leaderboard/ui";
import axios from "axios";
import { graphqlClient } from "../requests/AxiosInterceptor";
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











export default function Home({marketValueRanking,ratingRanking} : InferGetStaticPropsType<typeof getStaticProps>) {

  console.log(marketValueRanking,ratingRanking);
  
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
  console.log("getStaticProps");
  const marketValueRankings =       await graphqlClient.post<GraphQLResponse<MarketValueRanking>>("", JSON.stringify({
    query: `
    query {
      players {
        name
        market_value
      }
    }
    `,

  }))

  const ratingRankings =       await graphqlClient.post<GraphQLResponse<RatingRanking>>("", JSON.stringify({
    query: `
    query {
      players {
        name
        rating
      }
    }
    `,
  }))


  return {
    props: {
      marketValueRanking: marketValueRankings.data,
      ratingRanking: ratingRankings.data.data.players


     
      
      
    },
    revalidate: 600,
    
  };
}