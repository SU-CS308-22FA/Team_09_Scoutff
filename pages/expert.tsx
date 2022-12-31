import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Flex,
    Image,
    Text,
    Heading,
    Stack,
    Link,
    Button,
    useColorModeValue,
    VStack,
    HStack,
    SimpleGrid,
    Table,
    Tr,
    Th,
    Td,
    Tbody,
    Thead,
    Container,
    Select,
  } from "@chakra-ui/react";
import axios from "axios";
import { stat } from "fs";
import { url } from "inspector";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import * as Realm from "realm-web";
import { AnyObject } from "yup/lib/object";
import ShowcaseUI from "../components/showcase/ShowcaseUI";
import { PlayerInterface, PlayerWithStatisticsInterface } from "../interfaces/PlayerInterface";
import { SportAPIInterface } from "../interfaces/SportAPIınterface";
import { TeamInterface } from "../interfaces/TeamInterface";
import dbConnect from "../lib/mongoose";
import { getClient } from "../lib/realm/login";
import ExpertSquad from "../models/Expertsquads";

/**
 * Return data for each query with the 
 * corresponding types using graphql.
 * @param id the unique number which will identify expert
 * @returns the graphql query data result
 */
const convertToQuery = (id : number) => {

    return  gql`
  
    query {
      expert(query : {
        id : "${id}"
      }) {
        _id
        id
        flag
        age
        name
        photo
        ranking
        image
      }
    }
    
    `;
  
  }

type ExpertProps = {
    name?: string
    image?: string
    job?: string
    _id: string
    csrfToken: string
  }

  

  
const ExpertPage= ({name, image, job, _id, csrfToken, expertsquads} : ExpertProps |any) => {
  
  let dataMap = new Map();

    for (let i = 0; i < expertsquads.length; i++) {
        dataMap.set(expertsquads[i].num, expertsquads[i]);  
        }

    let myDataArray = [
        dataMap.get('expert1'),
        dataMap.get('expert2'),
        dataMap.get('expert3'),
        dataMap.get('expert4'),

    ];

    const [object, setObject] = useState(null);

  function handleChange(event: { target: { value: string | number; }; }) {
    setObject(expertsquads[event.target.value]);
  }
  


  
  return (
    <Container maxW="container.xl" p={0}>
    <Flex h="100vh" py={15}>
      <><VStack w="half" h="full" p={10} spacing={10} alignItems="flex-start">
        <HStack>
        <Image alt={"expertImage"} src={"https://www.macfit.com.tr/wp-content/uploads/2022/09/PHOTO-2021-12-16-17-56-13.png"} borderRadius='full' boxSize='200px'/>

        
        <VStack spacing={3} alignItems="center">
          
        <Heading size="md" fontWeight="bold" ml="4" color={"gray.800"}>
        {"Erman Yaşar"}
        </Heading>
        <Text fontSize="md" color={"blackAlpha.600"}>{"Commentator"} </Text>

        </VStack>
        </HStack>
        <Button rightIcon={<AddIcon />} size="lg" w="sm" bg="wheat" color="whiteAlpha.900" type="button"
                  loadingText="Creating">
              Create a squad 
            </Button>
       
      </VStack>
      <VStack w="full" h="full" p={10} spacing={10}>

        <Box
        height={'1200px'}
        alignItems={"flex-end"}
        width={"800px"}
        overflow={'hidden'}>
   <Box>
   <Select onChange={handleChange} 
   variant="filled"
   value={expertsquads.indexOf(object)} width={"200px"}>
  {expertsquads.map((obj, index: number) => (
    <option value={index} key={index}>{obj.name} </option>
  ))}
</Select>
{object && (
  <Box w={"fit-content"} alignItems={"center"}>
    <Text>{object.comment}</Text>
<ShowcaseUI data={myDataArray[expertsquads.indexOf(object)]}></ShowcaseUI>
        </Box>
      )}
    </Box>
</Box>
</VStack>
          </>
        </Flex>
  </Container>
    
  );
}
export default ExpertPage;


 
 
  
export const getServerSideProps = async () => {
  try {
    console.log('connecting to mongo');
    await dbConnect();
    console.log('connected to mongo');

    console.log('Fetching document');
    const expertsquads = await ExpertSquad.find().sort({ $natural: -1 });
    console.log('Fetched document');

    return {
      props: {
        expertsquads: JSON.parse(JSON.stringify(expertsquads)),
      },
    };
  } catch (error) {
    console.log('ERROR HAPPENNED. WHY? WHO KNOWS MAN');

    return { notFound: true };
  }
};
