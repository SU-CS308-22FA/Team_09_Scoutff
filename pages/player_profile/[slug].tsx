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
import { stat } from "fs";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import * as Realm from "realm-web";

const createClient = (token : string) =>
  new ApolloClient({
    ssrMode : true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  }); 


interface Props {
    shirt_number: string
    name: string
    image: string
    position: string
    details: string
    goals: number
    assists: number
    appearances: number 
    rating: number
    age: number
    // team: string
}


const convertToQuery = (slug : string) => {

  return  gql`

  query {
    player(query : {
      slug : "${slug}"
    }) {
      id
      flag
      age
      slug
      name
      shirt_number
      photo
      has_photo
      position_name
      
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







const PlayerPage: React.FC<Props> = ({shirt_number, name, image, position, details, goals, assists, appearances, rating, age /*team*/}) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
    <Box p="4" w="800px" mx="auto" textAlign="center" rounded="md" boxShadow="md">
      <Flex justifyContent="center" alignItems="center" mb="6">
        <HStack>
          <SimpleGrid columns={2} alignItems="center">
        <Image src={image} borderRadius='full' boxSize='200px'/>

        <VStack>
        <Heading size="md" fontWeight="bold" ml="4" color={"gray.800"}>
          {shirt_number} {name}
        </Heading>
        <Text fontSize="sm">{position} / {age}</Text>
        <Button colorScheme="twitter" mt="4">
        Add to favorites 🌟
      </Button>
        </VStack>
        </SimpleGrid>
        </HStack>
      </Flex>
      <Stack spacing="4" mt="4">
        <Text>{details}</Text>
      </Stack>
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


  function Player({data} : InferGetServerSidePropsType<typeof getServerSideProps>) {

  

    return (
      <PlayerPage
        name={data.name}
        image={data.has_photo ? data.photo : null}
        position={data.position_name}
        details="Lionel Andrés Messi is an Argentine professional footballer who plays as a forward and captains both Spanish club Barcelona and the Argentina national team."
        goals= {data.statistics.attacking.goals}
        assists= {data.statistics.passes.assists}
        appearances= {data.statistics.matches.matches_total}
        rating= {data.statistics.rating}
        age= {data.age}
        // team= "PSG"
        shirt_number = {`#${data.shirt_number}`}
      />
    );
  }
  
  export default Player;
  

  export const getServerSideProps = async (context : GetServerSidePropsContext<ParsedUrlQuery,PreviewData>) => {
    const apiKey = process.env.REALM_API_KEY;
    const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID! });
  
  
    //convert each rating in statistics.rating array to double
  
    
  
  
    // Log in user using realm API key
    const credentials = Realm.Credentials.apiKey(process.env.REALM_API_KEY ?? "");
  
    const user = await app.logIn(credentials);
  
  
  

  
  
  

    const client = createClient(user.accessToken ?? "");

    //get slug from url
    const slug = context.query.slug


    if (!slug) {
      return {
        notFound: true,
      };
    }




    

    const { data } =   await client.query({
      query: convertToQuery(slug as string),
    });


    console.log(data)

    if (!data.player )
    {
      return {
        notFound: true,
      }
    }


    return {
      props: {
        data : data.player,
      },
    }
    
  
  
  
    
  

  }