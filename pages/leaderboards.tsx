
import Head from "next/head";
import React from "react";

import LBCompIndex from "../components/leaderboard/ui";

import * as Realm from "realm-web";
import { ApolloClient, gql, HttpLink, InMemoryCache ,useQuery} from "@apollo/client";
import Player, { IPlayer } from "../models/Player";
import { InferGetStaticPropsType } from "next";
import LeaderboardUI from "../components/leaderboard/ui/LeaderboardUI";

// 2. Function to create GraphQL client


export type RatingPlayers = {
  rating: number;
  name : string;
}

export type MarketPlayers = {
  name: string;
  market_value: number;
}

type GraphQLProps<T> = {
  players : Array<T>;
}





const GET_PLAYERS_RATING = gql`query {players(limit:10,sortBy:RATING_DESC,query :{rating_gt:0}) { name rating}}`;

const GET_PLAYERS_MARKET = gql`query {players(limit:10,sortBy:MARKET_VALUE_DESC,query :{market_value_gt : 0}) {name market_value}}`;


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



export default function Home({dataRating,dataMarket} :InferGetStaticPropsType<typeof getStaticProps>)  {


  const CompIndex = <LBCompIndex>
        <LeaderboardUI dataMarket={dataMarket} dataRating={dataRating}></LeaderboardUI>
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
  



  const dataRating   = await client.query<GraphQLProps<RatingPlayers>>({
    query: GET_PLAYERS_RATING,
  });



  const  dataMarket  = await client.query<GraphQLProps<MarketPlayers>>({
    query: GET_PLAYERS_MARKET,
  });






  





  




  return {
    props: {
      dataRating : dataRating.data.players,
      dataMarket : dataMarket.data.players,
    },
    revalidate: 60,
  };
}