
import Head from "next/head";
import React from "react";

import LBCompIndex from "../components/leaderboard/ui";

import * as Realm from "realm-web";
import { ApolloClient, DocumentNode, gql, HttpLink, InMemoryCache ,NormalizedCacheObject,useQuery} from "@apollo/client";
import Player, { IPlayer } from "../models/Player";
import { InferGetStaticPropsType } from "next";
import LeaderboardUI from "../components/leaderboard/ui/LeaderboardUI";

// 2. Function to create GraphQL client


export type RatingPlayers = {
  rating: number;
  name : string;
}

export type StatPlayers = Record<string, Object | number> &  {
  name : string;
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

    const queryConverted = gql`query {playersNestedSort(input : {limit:10,path:${quotedString(ranking)}}) { name ${dotSeperatedStringToNestedGraphqlSelection(ranking)}}}`;



    
    const data = await client.query<GraphQLProps<
      StatPlayers
    
    >>({
      query: queryConverted,
    });
    








    return data.data.playersNestedSort;


    
  }));

  




  

  return query;

  
}




const createClient = (token : string) =>
  new ApolloClient({
    ssrMode : true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  }); 



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
  const apiKey = process.env.REALM_API_KEY;
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID! });


  //convert each rating in statistics.rating array to double

  


  // Log in user using realm API key
  const credentials = Realm.Credentials.apiKey(process.env.REALM_API_KEY ?? "");

  const user = await app.logIn(credentials);









  const client = createClient(user.accessToken ?? "");
  

  












  





  




  return {
    props: {
      data :  await getQueryResults(client,["statistics.rating","market_value","statistics.attacking.goals","statistics.passes.big_chance_created","statistics.passes.assists","statistics.cards.yellow_cards"])

      
    },
    revalidate: 6000,
  };
}