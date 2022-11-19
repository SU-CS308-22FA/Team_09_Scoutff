import { useSession, signIn, signOut } from "next-auth/react"
import {ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, useDisclosure, Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import UserCompIndex from "../components/user/ui";
import LBCompIndex from "../components/leaderboard/ui";

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