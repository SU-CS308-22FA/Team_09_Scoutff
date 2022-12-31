import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Flex,
    Image,
    Text,
    Heading,
    VStack,
    HStack,
    Container,
    Select,
  } from "@chakra-ui/react";
import axios from "axios";

import {InferGetServerSidePropsType } from "next";

import React, { useEffect, useState } from "react";
import dbConnect from "../lib/mongoose";
import Expert, { IExpert } from "../models/Expert";

/**
 * Return data for each query with the 
 * corresponding types using graphql.
 * @param id the unique number which will identify expert
 * @returns the graphql query data result
 */




  
const ExpertPage= ({experts}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    if (!experts || experts.length === 0) {
        return <div>
            <Center>
                <Text fontSize="xl" color={"blackAlpha.600"}>{"No expert found"} </Text>
            </Center>
        </div>
    }
   


    const [expert, setExpert] = useState(experts[0]);

    const handleExpertChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExpert(experts[parseInt(event.target.value)]);
    }




  
  return (
    <Container maxW="container.xl" p={0}>
    <Flex h="100vh" py={15}>
      <><VStack w="half" h="full" p={10} spacing={10} alignItems="flex-start">
        <HStack>
        <Image alt={"expertImage"} src={expert.image ?? "https://www.macfit.com.tr/wp-content/uploads/2022/09/PHOTO-2021-12-16-17-56-13.png"} borderRadius='full' boxSize='200px'/>

        
        <VStack spacing={3} alignItems="center">
          
        <Heading size="md" fontWeight="bold" ml="4" color={"gray.800"}>
        {expert.name}
        </Heading>
        <Text fontSize="md" color={"blackAlpha.600"}>{"Commentator"} </Text>

        </VStack>
        </HStack>

       
      </VStack>
      <VStack w="full" h="full" p={10} spacing={10}>

        <Box>

            <Select 
                variant="filled"
                onChange={handleExpertChange}
                width={"200px"}>
                {experts.map((expert,index) => (
                    <option value={index}>{expert.name}</option>
                ))}

            </Select>

            <Box
            height={'1200px'}
            alignItems={"flex-end"}
            width={"800px"}
            overflow={'hidden'}>
            </Box>

        </Box>



    </VStack>

    </>
    </Flex>
    </Container>

    );

};

export default ExpertPage;




 
 
  
export const getServerSideProps = async () => {
    await dbConnect();

    const experts = await Expert.find({}).select("image  name   _id").lean();

    //convert id to string
    experts.forEach((expert) => {
        expert._id = expert._id.toString();
    });

    
    return {
      props: {
        experts : experts
      },
    };

};
