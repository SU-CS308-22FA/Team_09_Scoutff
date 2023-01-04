import { ApolloClient, gql, HttpLink, InMemoryCache, useApolloClient, useMutation } from "@apollo/client";
// import ReactCountryFlag from "react-country-flag"
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
    Spacer,
    Grid,
  } from "@chakra-ui/react";
import axios from "axios";
import { stat } from "fs";
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, PreviewData } from "next";
import { getCsrfToken } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { useApp } from "../../hook/useApp";
import { PlayerInterface, PlayerWithStatisticsInterface } from "../../interfaces/PlayerInterface";
import { TeamInterface } from "../../interfaces/TeamInterface";
import { getClient } from "../../lib/realm/login";



  type GraphQLProps<T> = {
    player : T;
  }

  type GraphQLPlayerAllProps<T> = {
    players : T;
  }


  type GraphQLPlayerLikeCountProps = {
    getLikedByCount : {
      count : number
      likedBy : boolean
    }

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
      preferred_foot
      height
      weight
      nationality_code
      name
      shirt_number
      photo
      market_value
      has_photo
      position_name
      preferred_foot
      weight
      height

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


export const playerLikeQuery = (slug : string) => {

  return gql`
  query {
  getLikedByCount(input : "${slug}") {
    count
    likedBy
  }
}
`


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
  flag?: string
  nationality_code?: string
  preferred_foot?: string
  market_value: number 
  weight?:number | string
  height?:number | string
  team?: TeamInterface
  slug : string


}




const PlayerPage= ({market_value,nationality_code,slug, flag, height, weight, preferred_foot,shirt_number, name, image, position, goals, assists, appearances, rating, age,_id, team} : Omit<PlayerProps,"market_value"> &  {csrfToken : string, market_value: string}) => {

  const [csrfToken, setCsrfToken] = React.useState<string | undefined>(undefined);

      const ADD_FAVOURITE = gql`
      mutation {
        addFavourite(input: { playerId: "${_id}" }) 
      }
    `;




    const [addFav] = useMutation(ADD_FAVOURITE, {
      refetchQueries: [
        {query: playerLikeQuery(slug)}, // DocumentNode object parsed with gql
        'getLikedByCount' // Query name
      ],

    });
    
  


    
  
  
  

  useEffect(() => {
    getCsrfToken().then((token) => {
      setCsrfToken(token);
    });


  

  }, []);



  const [likedBy,setLikedBy] = useState<number>(0);
  const [userLikes,setUserLikes] = useState<boolean>(false);
  const app = useApp();
  const client = useApolloClient();


  useEffect(() => {
    
    const queryLiked = async () => {
      if (client) {
        const likedByCount = await client.query<GraphQLPlayerLikeCountProps>({
          query : playerLikeQuery(slug)
        })
        setLikedBy(likedByCount.data.getLikedByCount.count);
        setUserLikes(likedByCount.data.getLikedByCount.likedBy);

      }

    }
    queryLiked();
  },[client,app,slug])


  const addFavourite = async () => {

    await addFav().then((res) => {
      setUserLikes(true);
      setLikedBy(likedBy + 1);
    })




  }


  
  


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
    <Box p="4" w="850px" mx="auto" textAlign="center" rounded="md" boxShadow="md" bgColor="ghostwhite">
      <Flex justifyContent="center" alignItems="center" mb="6">
        <HStack>
          <SimpleGrid columns={3} alignItems="center">
        <Image alt={"player"} src={image} borderRadius='full' boxSize='200px'/>

        <VStack>
        <Heading size="md" fontWeight="bold" ml="4" color={"gray.800"}>
          {shirt_number} {name}
        </Heading>
        <Text fontSize="sm">{position} / {age}</Text>
        <Button colorScheme="twitter" mt="4" onClick={addFavourite} disabled={userLikes}>
          {userLikes ? "Favourited ✓" : "Add to favorites"}
      </Button>
        </VStack>

        <VStack>
          <Image alt={"logo"} src={team?.logo} borderRadius='full' boxSize='100px'/>
          <Text fontSize="sm">{team?.name}</Text>
        </VStack>
        </SimpleGrid>
        
        </HStack>
      </Flex>
      <HStack p="8" w="full" mx="auto" rounded="lg" boxShadow="lg">
      <Flex>

      <Flex justifyContent="center" alignItems="center" mb="6">

<HStack p="4" w="full" mx="auto" boxShadow="md" alignItems={"center"} >
    <VStack>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Value</Text>
    <Text textAlign="center">€{market_value} M</Text>
  </Box>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Weight</Text>
    <Text textAlign="center">{weight}</Text>
  </Box>
  </VStack>
  <VStack>

  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Preferred Foot</Text>
    <Text textAlign="center">{preferred_foot}</Text>
  </Box>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Height</Text>
    <Text textAlign="center">{height}</Text>
  </Box>

  </VStack>
  <VStack>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Country</Text>
    <Text textAlign="center">{nationality_code}</Text>
  </Box>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Liked By</Text>
    <Text textAlign="center">{likedBy}</Text>
  </Box>
  </VStack>
  </HStack>
  </Flex>
    <Spacer width={"80px"}>
    </Spacer>
    <Flex justifyContent="center" alignItems="center" mb="6">

<HStack p="4" w="full" mx="auto"  boxShadow="md" alignItems={"center"}>
    <VStack>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Goals</Text>
    <Text textAlign="center">{goals}</Text>
  </Box>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Assists</Text>
    <Text textAlign="center">{assists}</Text>
  </Box>
  </VStack>
  <VStack>

  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Appearances</Text>
    <Text textAlign="center">{appearances}</Text>
  </Box>
  <Box p="4">
    <Text fontWeight="bold" textAlign="center">Rating</Text>
    <Text textAlign="center">{rating?.toFixed(2)}</Text>
  </Box>
  </VStack>

  </HStack>
  </Flex>

    </Flex>
    </HStack>

      </Box>
    </Flex>
    
  );
}




  function Player({data,csrfToken} : {data : PlayerWithStatisticsInterface  , csrfToken : string}) {




    const slug = data.slug;






    


    


  

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
        flag={data?.flag}
        weight={ data?.weight ? data.weight  : 'N/A' } 
        market_value={data?.market_value ? ((data.market_value)/1000000).toFixed(2) : 'N/A'}
        nationality_code={data?.nationality_code}
        height={ data?.height ? data.height.toFixed(2) : 'N/A' }
        preferred_foot={data?.preferred_foot}
        shirt_number = {`#${data.shirt_number}`}
        csrfToken = {csrfToken}
        slug = {slug}
      />
    );
  }
  
  export default Player;
  

  export const getStaticProps : GetStaticProps = async (context) => {

    const slug = context.params?.slug;

    const client = await getClient();




    if (!slug) {
      return {
        notFound: true,
      };
    }



    

    const {data} =  client ?   await client.query<GraphQLProps<PlayerWithStatisticsInterface>>({
      query: convertToQuery(slug as string),
    }) : {data : {player : {}}};




    return {
      props: {
        data : data.player,
      },
      revalidate: 1200,
    }
    
  
  
  
    
  

  }

  export const getStaticPaths: GetStaticPaths = async () => {

    const client = await getClient();

    
    if (client) {

      const paths = await client.query<GraphQLPlayerAllProps<Array<PlayerInterface>>>({
        query: gql`
        query {
          players(limit : 1000) {
            slug
          }
        }
        `,
      })



      return {
        paths: paths.data.players.map((player) => ({
          params: { slug: player.slug },
        })),
        fallback: false,
      };

    }
    else {
      return {
        paths: [],
        fallback: true,

      }
    }
    


  };