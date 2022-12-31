import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import {   Box,
    Button,
    Flex,
    Heading,
    Link,
    Text,
    Table,
    Tbody,
    Td,
    Thead,
    Tr, 
    TableContainer,
    HStack,
    useColorModeValue,
    Th,
    Container,
    Center} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import UserCompIndex from "../components/user/ui";
import HelpCompIndex from "../components/help/ui";
import { GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export default function Evaluation() {
  return (
    
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    paddingBottom={"150px"}
    bg={useColorModeValue('gray.100', 'gray.800')}>  
  <Box  p="4" w="850px" mx="auto" textAlign="center" rounded="2xl" boxShadow="md" bgColor="white" >
   <TableContainer   >
    <Table>
      <Thead>
        <Tr>
          
          <Th fontWeight="bold"><Center>Applicant Name</Center></Th>
          <Th fontWeight="bold"><Center>Email</Center></Th>
          <Th fontWeight="bold"><Center>Uploaded File</Center></Th>
          <Th fontWeight="bold"> <Center>Actions</Center></Th>
          
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td>
            <Button colorScheme="green" mr={2}>
              Accept
            </Button>
            <Button colorScheme="red" mr={2}>
              Reject
            </Button>
            <Button colorScheme="blue">Download Document</Button>
          </Td>
        </Tr>
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td>
            <Button colorScheme="green" mr={2}>
              Accept
            </Button>
            <Button colorScheme="red" mr={2}>
              Reject
            </Button>
            <Button colorScheme="blue">Download Document</Button>
          </Td>
        </Tr>
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td>
            <Button colorScheme="green" mr={2}>
              Accept
            </Button>
            <Button colorScheme="red" mr={2}>
              Reject
            </Button>
            <Button colorScheme="blue">Download Document</Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
   </TableContainer>
  </Box>
 </Flex>
 
  );
}

export const getServerSideProps  = async (context : GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const csrfToken = await getCsrfToken(context)



  return {
    props: { 
      csrfToken
     },
  }
}
