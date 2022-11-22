
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
  const credentials = Realm.Credentials.apiKey("ThqKqf1EJZZHFaB2kfjfEM0SQmv1FquOhD0VHqEPzxEqtmF3WBOynzZhsMcHFl7Z");

  //const credentials = Realm.Credentials.jwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIyNjg5ODM5MzMsImlhdCI6MTY2ODk4MjEzMywiYXVkIjoiZm9vdGJhbGwtdWh1YW4iLCJzdWIiOiI2MzcwZTMxMGQzZDc4MWJiNWIwYzEwNzYiLCJlbWFpbCI6ImVyaGFuYkBzYWJhbmNpdW5pdi5lZHUifQ.Cz2iVFOxpAER7W-WBuhnTXFGd-Y3QX3mda_YvbwfvFw")
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