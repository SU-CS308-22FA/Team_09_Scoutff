import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
// import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import SquadsCompIndex from "../components/customsquads";
import { ApolloClient, DocumentNode, gql, HttpLink, InMemoryCache ,NormalizedCacheObject,useQuery} from "@apollo/client";
import { getClient } from "../lib/realm/login";
import { InferGetStaticPropsType } from "next";



export default function Home({data} :InferGetStaticPropsType<typeof getStaticProps>) {


  return (
    <div>
      <Head>
        <title>Squads | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SquadsCompIndex data={data}/>
      </main>
    </div>
  );
}


export type StatPlayers = Record<string, Object | number> &  {
  name : string;
  slug : string;
  position: string;
  age: number;
  has_photo: boolean;
  photo: string;
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



/**
 * This function takes a client and rankings which are requested; returns the query as you requested
 * @param {ApolloClient<NormalizedCacheObject>, Array<string>} input client and ranking array with strings
 * @returns {ApolloQueryResult<GraphQLProps<StatPlayers>>} requested query
 * 
*/
const getQueryResults =  async (client : ApolloClient<NormalizedCacheObject>  ,rankings : Array<string>)  => {

  const query =  await Promise.all(rankings.map(async (ranking) => {

    const queryConverted = gql`query {playersNestedSort(input : {limit:200,path:${quotedString(ranking)}}) { slug name position age has_photo photo ${dotSeperatedStringToNestedGraphqlSelection(ranking)}}}`;
    
    const data = await client.query<GraphQLProps<
      StatPlayers
    
    >>({
      query: queryConverted,
    });
    
    return data.data.playersNestedSort;

  }));


  

  return query;

  
}



export async function getStaticProps() {

  const client = await getClient()
  return {
    props: {
      data : client ?  await getQueryResults(client,["statistics.rating", "statistics.cards.yellow_cards", "age"]) : []

    },
    revalidate: 1200,
  };
}
