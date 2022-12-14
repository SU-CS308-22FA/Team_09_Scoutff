
import Head from "next/head";
import React from "react";

import LBCompIndex from "../components/leaderboard/ui";

import * as Realm from "realm-web";
import { ApolloClient, DocumentNode, gql, HttpLink, InMemoryCache ,NormalizedCacheObject,useQuery} from "@apollo/client";
import Player, { IPlayer } from "../models/Player";
import { InferGetStaticPropsType } from "next";
import LeaderboardUI from "../components/leaderboard/ui/LeaderboardUI";
import { getClient } from "../lib/realm/login";
import { useApp } from "../hook/useApp";

// 2. Function to create GraphQL client



export type StatPlayers = Record<string, Object | number> &  {
  name : string;
  slug : string;
}




type GraphQLProps<T> = {
  playersNestedSort : Array<T>;
}


const quotedString = (str: string) => `"${str}"`;


const dotSeperatedStringToNestedGraphqlSelection = (str: string) => {
  const arr = str.split(".");
  if (arr.length === 1) return str;
  return arr.reduceRight((acc, curr, index) => {
    if (acc === "") return curr;



    return `${curr} {${acc}}`;
  }
  );

};






const getQueryResults =  async (client : ApolloClient<NormalizedCacheObject>  ,rankings : Array<string>)  => {

  const query =  await Promise.all(rankings.map(async (ranking) => {

    const queryConverted = gql`query {playersNestedSort(input : {limit:10,path:${quotedString(ranking)}}) { slug name ${dotSeperatedStringToNestedGraphqlSelection(ranking)}}}`;



    
    const data = await client.query<GraphQLProps<
      StatPlayers
    
    >>({
      query: queryConverted,
    });
  
    return data.data.playersNestedSort;
    
  }));


  return query;

}





export default function Home({data} :InferGetStaticPropsType<typeof getStaticProps>)  {

  const CompIndex = <LBCompIndex>
        <LeaderboardUI data={data}></LeaderboardUI>
  </LBCompIndex>;


  
  return (
    <div>
      <Head>  
        <title>Leaderboards | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        {CompIndex}

      </main>
    </div>
  );

}

export async function getStaticProps() {



  const client = await getClient()


  return {
    props: {
      data : client ?  await getQueryResults(client,["statistics.rating","market_value","statistics.attacking.goals","statistics.passes.big_chance_created","statistics.passes.assists","statistics.cards.yellow_cards","statistics.defending.clean_sheets","statistics.defending.tackles_per_game","statistics.attacking.total_shots_per_game"]) : []

    },
    revalidate: 1200,
  };
}