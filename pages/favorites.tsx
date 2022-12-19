import { useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"
import { Button, Flex, Heading,  Stack,  Text,  useBreakpointValue,  useColorModeValue, Wrap, Center,Table, Thead,Tbody,Tfoot, Tr, Th, Td,Container,TableCaption,TableContainer, Square, Circle, Box, HStack, Grid, Spacer, Divider, VStack, ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, useDisclosure, SimpleGrid,
 } from "@chakra-ui/react";
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

  const {isOpen, onClose, onOpen} = useDisclosure();

  const favourites_10 = favourites?.filter(first10);

  return (
  <div>
   <Head>
    <title>Favorite Players | Scoutff</title>
     <meta name="description" content="Scoutff 2022." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
     <Box bg = 'gray.100'>
      <Box bg='gray.100' h='20px'></Box>
       <HStack>
        <Flex marginTop={50} marginBottom='50px' marginLeft='350px' marginRight='350px' >    
         <Box borderWidth={2} borderColor="white" bg="white" borderRadius={'2xl'}>
          <main>
           <TableContainer>
            <Table color='black'  colorScheme='gray'>
             <TableCaption>
              <Center>
               {favourites_10 && favourites_10.length ?
                <>
                <VStack>
                <Box h='7px' w='200px' bg='white'> </Box>
                          <Button marginX='5px' onClick={onOpen} background='black' textColor='white' borderRadius='xl' >See all ➤</Button>     
                          </VStack>       
                </>
                : <div>There are no favourites</div>  }
     
            

          <Modal isOpen={isOpen}  onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
              <TableContainer>
                  <Table variant='simple'>
        
                    <Thead>
                      <Tr>
                        
                        <Heading  size={'md'} textAlign={'center'} >Your Favourites</Heading>
                      </Tr>
                    </Thead>
                    <Tbody>
                    {favourites && favourites.length  ? 
            
                      <ul>
                      {favourites.map((fav,index) => (
                        
                        <li key={fav.name + index.toString()}>
                          <Center paddingTop={3} paddingBottom={2}>
                          {fav.name}<Button onClick={() => removeFavorite(fav.id, csrfToken)} variant="ghost" borderRadius={'full'}  size={'xs'} fontWeight={'bold'} fontSize={10}  colorScheme={"red"}>X</Button>
                            </Center><Center><Divider width={40} ></Divider></Center>
                          </li>))} 
                      </ul>
                  
                          : 
                      <div>There are no favourites</div>}

                    </Tbody>
                  </Table>
                </TableContainer>
              </ModalBody>
            </ModalContent>
            </Modal>        
         </Center>
          </TableCaption>
            <Thead>
              <Tr>
              <Heading paddingTop={5} size={'md'} textAlign={'center'} >Your Favourites ⭐</Heading>
              </Tr>
            </Thead>
            <Tbody>
            
            {favourites_10 && favourites_10.length  ? 
            
            <ul>
            {favourites_10.map((fav,index) => (
              
              <li key={fav.name + index.toString()} >
                
                <Center paddingTop={3} paddingBottom={2}>
                  
                {fav.name}<Button onClick={() => removeFavorite(fav.id, csrfToken)}  variant="ghost" borderRadius={'full'}  size={'xs'} fontWeight={'bold'} fontSize={10}  colorScheme={"red"}>X</Button>
                  
                  </Center><Center><Divider width={40} ></Divider></Center>
                </li>))} 
              
            </ul>
        
                : 
            <div>There are no favourites</div>}
            

          
            </Tbody>
            
          </Table>
        </TableContainer>
                

          </main>
          
          
        </Box>
        </Flex> 
        

        <Flex marginTop={50} marginBottom='50px'>
          <Box borderWidth={2} borderColor="white" bg="white" borderRadius={'2xl'}>
           <Heading paddingTop={5} size={'md'} textAlign={'center'} >Popular Players 📈</Heading>
             
            <Flex  marginRight={5} marginLeft={5}  marginBottom={5} marginTop={5}  gridGap={50} >
              <VStack  >
                <VStack marginBottom={10} >
                  <Box  >
                  <Center> <Circle size='40px' bg='black' color='white'></Circle> </Center>
                  <Center> <Heading size={'sm'} >Arda Güler</Heading></Center>
                  <Center>   <Button textColor={'white'} fontWeight={'bold'} onClick={() => addFavoriteArdaGuler(csrfToken)} size="md" bg = 'green.400' variant={"solid"}>
                      Add ➕
                      </Button></Center>
                  </Box>
                  </VStack>
                  
                  <VStack >
                  <Box >
                  <Center> <Circle size='40px' bg='black' color='white'></Circle> </Center>
                  <Center>  <Heading size={'sm'} >Dries Mertens</Heading> </Center>
                  <Center>  <Button textColor={'white'} fontWeight={'bold'} onClick={() => addFavoriteDriesMertens(csrfToken)}size="md" bg = 'green.400' variant={"solid"}>
                     Add ➕
                     </Button> </Center>
                  </Box>
                  </VStack>
              </VStack>
              <VStack  >
                <VStack  marginBottom={10} >
                <Box>
                <Center> <Circle size='40px' bg='black' color='white'></Circle> </Center>
                <Center>   <Heading size={'sm'} >Mauro Icardi</Heading> </Center>
                <Center>   <Button textColor={'white'} fontWeight={'bold'} onClick={() => addFavoriteMauroIcardi(csrfToken)} size="md" bg = 'green.400' variant={"solid"} >
                    Add ➕
                    </Button> </Center>
                 </Box>
                 </VStack>
                
                 <VStack>
                 <Box >
                 <Center>   <Circle size='40px' bg='black' color='white'></Circle> </Center>
                 <Center>    <Heading  size={'sm'} >Kerem Aktürkoğlu</Heading> </Center>
                 <Center>     <Button  textColor={'white'} fontWeight={'bold'} onClick={() => addFavoriteKeremAkturkoglu(csrfToken)} size="md" bg = 'green.400' variant={"solid"}>
                     Add ➕
                     </Button> </Center>
                  </Box>
                  </VStack>

                </VStack>  
              </Flex>
                 
            </Box>
          </Flex>     
          </HStack>
       <Box 
        bg={"gray.100"}
        color={useColorModeValue('gray.700', 'gray.200')}>
         <Box h='230px'> 
          
         </Box>
         <Center>
            <text> © 2022 Scoutff</text> 
          </Center>
        </Box>
        
      </Box>
    
    </div>
  );
}

function first10(element: any, index: number, array: any)
{
  return (index < 10);
}


const addFavoriteArdaGuler = async (csrfToken: string | undefined) => {
  await axios.post("/api/user/favourites/638fd3b736819a5631e06f1d", {
    csrfToken: csrfToken,
  })
}
const addFavoriteDriesMertens = async (csrfToken: string | undefined) => {
  await axios.post("/api/user/favourites/638fd3b736819a5631e06f8e", {
    csrfToken: csrfToken,
  })
}
const addFavoriteMauroIcardi = async (csrfToken: string | undefined) => {
  await axios.post("/api/user/favourites/638fd3b736819a5631e06f90", {
    csrfToken: csrfToken,
  })
}
const addFavoriteKeremAkturkoglu = async (csrfToken: string | undefined) => {
  await axios.post("/api/user/favourites/638fd3b736819a5631e06f51", {
    csrfToken: csrfToken,
  })
}

const removeFavorite= async (id: string | undefined, csrfToken: string | undefined) => {
  await axios.delete(`/api/user/favourites/${id}`, {
    data :{csrfToken: csrfToken,}
  }
  )
}
{/** const removeFavoriteArdaGuler = async (csrfToken: AxiosRequestConfig<any>) => {
  await axios.delete("/api/user/favourites/638fd3b736819a5631e06f1d", {
    csrfToken: csrfToken,
  })
}*/}



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
