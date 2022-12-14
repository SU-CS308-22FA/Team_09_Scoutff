import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
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
  } from "@chakra-ui/react";
import axios from "axios";
import { stat } from "fs";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import * as Realm from "realm-web";
import { PlayerInterface, PlayerWithStatisticsInterface } from "../interfaces/PlayerInterface";
import { SportAPIInterface } from "../interfaces/SportAPIınterface";
import { TeamInterface } from "../interfaces/TeamInterface";
import { getClient } from "../lib/realm/login";

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
    ranking?: number
    age?: number
    _id: string
    csrfToken: string
  }

const ExpertPage= ({name, image, ranking, age, _id, csrfToken} : ExpertProps) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
    <Box p="4" w="800px" mx="auto" textAlign="center" rounded="md" boxShadow="md">
      <Flex justifyContent="center" alignItems="center" mb="6">
        <HStack>
          <SimpleGrid columns={3} alignItems="center">
        <Image alt={"expertImage"} src={"image"} borderRadius='full' boxSize='200px'/>

        <VStack>
        <Heading size="md" fontWeight="bold" ml="4" color={"gray.800"}>
        {"#ranking"} {"name"}
        </Heading>
        <Text fontSize="md" color={"purple.500"}>{"Expert"} </Text>
        <Text fontSize="sm">{"age"} </Text>

        </VStack>

       
        </SimpleGrid>
        </HStack>
      </Flex>

      <HStack p="4" w="full" mx="auto" rounded="md" boxShadow="md">

    <Box overflowX="scroll" overflowY="scroll">
      <Flex>
        <Table>
        {/* Use a loop to create the table header */}
        <Thead>
          <Tr>
            <Th fontWeight="bold" textAlign="center">Item/Feature</Th>
            {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map(header => (
              <Th key={header} fontWeight="bold" textAlign="center">
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        {/* Use a loop to create the rows for each item or feature */}
        {["Like Count"].map(item => (
          <Tr key={item}>
            <Td fontWeight="bold" textAlign="center">{item}</Td>
            {/* Use a loop to create the cells for each criterion */}
            {Array.from({ length: 5 }, (_, i) => (
              <Td key={i} textAlign="center">
                {/* Add the value for the criterion here */
                20
                }</Td>
            ))}
          </Tr>
        ))}
        </Table>
      </Flex>
    </Box>
    
    </HStack>
      </Box>
    </Flex>
    
  );
}
export default ExpertPage;


 
 
  
