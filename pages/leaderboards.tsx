
import Head from "next/head";
import React from "react";

import LBCompIndex from "../components/leaderboard/ui";

import * as Realm from "realm-web";
import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import Player from "../models/Player";

// 2. Function to create GraphQL client

/* 
const GET_PLAYERS = gql`
  query {
    players {
      rating,
      name,
      slug
    }
  }
`;


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
  }); */



export default function Home() {


  
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

export async function getStaticProps() {
/*   const apiKey = process.env.REALM_API_KEY;
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID! });


  //convert each rating in statistics.rating array to double

  


  // Log in user using realm API key
  const credentials = Realm.Credentials.apiKey("ThqKqf1EJZZHFaB2kfjfEM0SQmv1FquOhD0VHqEPzxEqtmF3WBOynzZhsMcHFl7Z");

  const user = await app.logIn(credentials);






  const client = createClient(user.accessToken ?? "");

  const { data } = await client.query({
    query: GET_PLAYERS,
  });

  console.log(data); */




  return {
    props: {
    },
  };
}