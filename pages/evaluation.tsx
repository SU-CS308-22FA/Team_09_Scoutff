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
    Center,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Modal} from "@chakra-ui/react";
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
import { IUser } from "../models/User";

export default function Evaluation({csrfToken, applications2}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  const [applications, setapplications] = useState<Array<IApplyexpert> | undefined>(applications2)
  const [comm, setcomm] = useState<string | undefined>()

  console.log(applications)
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    paddingBottom={"150px"}
    bg={useColorModeValue('gray.100', 'gray.800')}>  
  <Box  p="4" w="1050px" mx="auto" textAlign="center" rounded="2xl" boxShadow="md" bgColor="white" >
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
       <><Modal isOpen = {isOpen} onClose ={onClose}>
       <ModalOverlay/>
       <ModalContent>
         <ModalHeader>
           <ModalCloseButton/>
         </ModalHeader>
         <ModalBody>
           <Center>
             {comm?? <Center>No information provided.</Center>}
           </Center>
         </ModalBody>
       </ModalContent>
     </Modal>
        
          {applications.map((app, index: number) => {
            const user = app.user as IUser
            return (
              <Tr key={app._id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
             
            
              <Button colorScheme="green" mr={2} onClick={async ()=> {
                    await axios.post(`/api/evaluateexpert/${app._id!}`, {decision : "accepted"}).then(
                      ()=>{
                            setapplications(temp=> temp?.filter(tempapp => tempapp._id !== app._id!) )
                      }
                    )
              }
              
              }  >
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
              <Button colorScheme="blue" mr={2} onClick={()=>{
                    window.open(app.pdf, "_blank")
              }}>
              Preview Document
              </Button>
              <Button bg="black" textColor={"white"} onClick={()=>
                {
                  setcomm(app.bio)
                  onOpen()
                }}>
              See Comments
              </Button>
              
            </Tr>
            )

          
            
          
          

            
  })}
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


  console.log(applications2)
    

  
  
  return {
    props: { 
      csrfToken,
      applications2
     },
  }
}
