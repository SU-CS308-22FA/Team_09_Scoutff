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
import { PlayerInterface, PlayerWithStatisticsInterface } from "../../interfaces/PlayerInterface";
import { SportAPIInterface } from "../../interfaces/SportAPIınterface";
import { TeamInterface } from "../../interfaces/TeamInterface";
import { getClient } from "../../lib/realm/login";



  type GraphQLProps<T> = {
    player : T;
  }




const convertToQuery = (slug : string) => {

  return  gql`

  query {
    player(query : {
      slug : "${slug}"
    }) {
      _id
      id
      flag
      age
      slug
      name
      shirt_number
      photo
      has_photo
      position_name

      team {
        name
        logo
        has_logo
      }
      
      statistics {
        matches {
          matches_total
        }
        attacking {
          goals
        }
        passes {
          assists
        }
        rating 
        
      }
  
    }
  }
  
  `;

}




type PlayerProps = {
  shirt_number?: string
  name?: string
  image?: string
  position?: string
  goals?: number
  assists?: number
  appearances?: number
  rating?: number
  age?: number
  _id: string
  csrfToken: string
  team?: TeamInterface

}




const PlayerPage= ({shirt_number, name, image, position, goals, assists, appearances, rating, age,_id,csrfToken, team} : PlayerProps) => {
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
        <Image src={image} borderRadius='full' boxSize='200px'/>

        <VStack>
        <Heading size="md" fontWeight="bold" ml="4" color={"gray.800"}>
          {shirt_number} {name}
        </Heading>
        <Text fontSize="sm">{position} / {age}</Text>
        <Button colorScheme="twitter" mt="4" onClick={() => addFavorite(_id,csrfToken)}>
        Add to favorites 🌟
      </Button>
        </VStack>

        <VStack>
          <Image src={team?.logo} borderRadius='full' boxSize='100px'/>
          <Text fontSize="sm">{team?.name}</Text>
        </VStack>
        </SimpleGrid>
        </HStack>
      </Flex>

      <HStack p="4" w="full" mx="auto" rounded="md" boxShadow="md">
      <Table>
          <Thead>
          <Tr>
            <Th fontWeight="bold" textAlign="center">Goals</Th>
            <Th fontWeight="bold" textAlign="center">Assists</Th>
            <Th fontWeight="bold" textAlign="center">Appearances</Th>
            <Th fontWeight="bold" textAlign="center">Rating</Th>
          </Tr>
          </Thead>
        
        <Tbody>
          
            <Tr>
              <Td textAlign="center">{goals}</Td>
              <Td textAlign="center">{assists}</Td>
              <Td textAlign="center">{appearances}</Td>
              <Td textAlign="center">{rating}</Td>
            </Tr>
                   
        </Tbody>
      </Table>
    </HStack>
      </Box>
    </Flex>
    
  );
}

const addFavorite = async (playerId : string,csrfToken : string) => {


   await axios.post(`/api/user/favourites/${playerId}`, {
    csrfToken: csrfToken,
  })

}


  function Player({data,csrfToken} : {data : PlayerWithStatisticsInterface  , csrfToken : string}) {

  

    return (
      <PlayerPage
        _id = {data._id}
        name={data.name}
        image={data.has_photo ? data.photo : undefined}
        position={data.position_name}
        goals= {data?.statistics?.attacking?.goals}
        assists= {data?.statistics?.passes?.assists}
        appearances= {data?.statistics?.matches?.matches_total}
        rating= {data?.statistics?.rating}
        age= {data?.age}
        team={data?.team}
        shirt_number = {`#${data.shirt_number}`}
        csrfToken = {csrfToken}
      />
    );
  }
  
  export default Player;
  

  export const getServerSideProps = async (context : GetServerSidePropsContext<ParsedUrlQuery,PreviewData>) => {


  
  
  

  
  
  

    const client = await getClient();

    //get slug from url
    const slug = context.query.slug


    if (!slug) {
      return {
        notFound: true,
      };
    }

    const csrfToken = await getCsrfToken(context)




    

    const {data} =  client ?   await client.query<GraphQLProps<PlayerWithStatisticsInterface>>({
      query: convertToQuery(slug as string),
    }) : {data : {player : {}}};





    
    



    


    return {
      props: {
        data : data.player,
        csrfToken
      },
    }
    
  
  
  
    
  

  }