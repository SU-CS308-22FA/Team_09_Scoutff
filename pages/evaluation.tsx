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
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import UserCompIndex from "../components/user/ui";
import HelpCompIndex from "../components/help/ui";
import { GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getApplyexpert } from "../lib/api/apply_expert";
import Applyexpert, { IApplyexpert, IApplyexpert2 } from "../models/Applyexpert";
import axios from "axios";

export default function Evaluation({csrfToken, applications2}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  const [applications, setapplications] = useState<Array<IApplyexpert> | undefined>(applications2)

  console.log(applications)
  
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
          
          <Th fontWeight="bold"> <Center>Actions</Center></Th>
          
        </Tr>
      </Thead>
      <Tbody>
       { applications && applications.length ?
       <>
        
          {applications.map((app: { firstname: string, lastname: string, email: string, pdf: string, _id?: string}, index: number) => (
          
          
            <Tr key={app._id}>
              <Td>{app.firstname +" " + app.lastname}</Td>
              <Td>{app.email}</Td>
             
            
              <Button colorScheme="green" mr={2} /* this should send informative email on click and also change status pending->accepted*/ >
                Accept 
              </Button>
              <Button colorScheme="red" mr={2} onClick={async ()=> {
                    await axios.post(`/api/evaluateexpert/${app._id!}`, {decision : "rejected"}).then(
                      ()=>{
                            setapplications(temp=> temp?.filter(tempapp => tempapp._id !== app._id!) )
                      }
                    )
              }
              
              }  >
                Reject
              </Button>
              <Button colorScheme="blue"  onClick={()=>{
                    window.open(app.pdf, "_blank")
              }}>
              Preview Document
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

  const applications2 = await getApplyexpert()

  //console.log(applications2)

  applications2.forEach(element => {element._id = element._id!.toString()})
    

  
  
  return {
    props: { 
      csrfToken,
      applications2
     },
  }
}
