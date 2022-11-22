import { useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import FavoritesCompIndex from "../components/favorites/ui";
import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getUserFavourites } from "../lib/api/user";
import { getToken } from "next-auth/jwt";
import invariant from "tiny-invariant";

export default function Home({csrfToken,favourites} : InferGetServerSidePropsType<typeof getServerSideProps>) {



  const addFavorite = async () => {

    const deneem = await axios.post("/api/user/favourites/63550795730a7fc502be606f", {
      csrfToken: csrfToken,
    })




  


  }

  return (
    <div>
      <Head>
        <title>Favorite Players | Scoutff</title>
        <meta name="description" content="Scoutff 2022." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {favourites && favourites.length  ? 

        <ul>
          {favourites.map((fav,index) => (
            <li key={fav + index.toString()}>{fav}</li>
            
          ))}
        </ul>
    

          : 
        <div>There are no favourites</div>}

        <Button onClick={addFavorite} width="500px">
          Add Arda Güler to your favorites
        </Button>

      </main>
    </div>
  );
}


export const getServerSideProps  = async (context : GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const csrfToken = await getCsrfToken(context)

  const session = await getToken(context)

  const userId = session?.sub

  const favourites = userId ? await getUserFavourites({userId}) : null





  return {
    props: { 
      favourites,
      csrfToken
     },
  }
}

