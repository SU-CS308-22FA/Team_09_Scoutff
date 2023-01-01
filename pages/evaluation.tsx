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
import { getApplyexpert } from "../lib/api/apply_expert";
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../models/Applyexpert";

export default function Evaluation({csrfToken, applications}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  

  
  return (
    
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    paddingBottom={"150px"}
    bg={useColorModeValue('gray.100', 'gray.800')}>  
  <Box  p="4" w="850px" mx="auto" textAlign="center" rounded="2xl" boxShadow="md" bgColor="white" >
   <TableContainer>
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
       { applications && applications.length ?
       <>
        
          {applications.map((app: { firstname: string, lastname: string, email: string, pdf: string}, index: number) => (
          
          
            <Tr key={index.toString()}>
              <Td>{app.firstname + app.lastname}</Td>
              <Td>{app.email}</Td>
              <Td>{app.pdf}</Td> {/*pdf name ?*/}
            
              <Button colorScheme="green" mr={2} /* this should send informative email on click and also change status pending->accepted*/ >
                Accept 
              </Button>
              <Button colorScheme="red" mr={2} /*change status from pending -> rejected */  >
                Reject
              </Button>
              <Button colorScheme="blue"  >
              Download Document
              </Button>
            </Tr>
          ))}
        </>
        :
        <div><Center>There are no applications</Center></div>}
          
      </Tbody>
    </Table>
   </TableContainer>
  </Box>
 </Flex>
 
  );
}

export const getServerSideProps  = async (context : GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const csrfToken = await getCsrfToken(context)

  const applications = await getApplyexpert()

  
  
  return {
    props: { 
      csrfToken,
      applications
     },
  }
}
