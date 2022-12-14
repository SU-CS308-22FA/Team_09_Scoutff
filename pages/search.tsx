import { Icon, Input, Flex, Text, Spinner, LinkBox, MenuList, Menu, LinkOverlay, Box, Avatar, InputGroup, InputLeftAddon, InputLeftElement, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useDebounce from  "../hook/useDebounce";
import { ApolloClient, gql, HttpLink, InMemoryCache, NormalizedCacheObject, useApolloClient, useQuery } from "@apollo/client";

import InterfacePlayer from "../models/Player";
import { string } from "yup";
import { SearchIcon } from "@chakra-ui/icons";
interface PlayerInterface {
    name: string;
    slug: string;
    photo: string;
    team:{
        name: string;
        logo: string;
    };
}



const convertToQuery = (graphqlQuery: string) => gql`query {playerSearch(input : {limit:5,path:"name",query:"${graphqlQuery}"}) { name slug photo team{name logo} }}`;

const SearchBar = () => {
  const [players, setPlayer] = useState<PlayerInterface[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  
  const debouncedSearch = useDebounce(search, 500);

  const [focusedSearch, setFocusedSearch] = useState(false);


  useEffect(() => {
    // search the api

    async function fetchData() {
      setLoading(true);
      
      setPlayer([]);

      const data = await client.query({
        query: convertToQuery(debouncedSearch),



      })
        



        


        
      

      console.log(data);

      setPlayer(data.data.playerSearch);
      setLoading(false);
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
  <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),0)}>
    <HStack zIndex={200}  >
      <InputGroup>
      <InputLeftElement children={<SearchIcon/>}  />
      <Input placeholder="Search"
    type= "search"
    colorScheme="teal" 
    onChange={(e) => setSearch(e.target.value)}
    />
      </InputGroup>

  {loading && <Spinner />}
  </HStack>


  {focusedSearch &&  
  <div style={{position:"absolute"}}>
    {players.map((player) => {
          return (
      
            <LinkBox key={player.slug}
          
            backgroundColor="Background"
            width= "250px"
            maxHeight={70}
            z-index= "30"
                  rounded="lg"
                  _hover={{
                    color: "gray",
                    transform: 'scale(1.05)',
                    transition: 'all 0.5s ease',
                    bg: 'rgba(0,0,0,0.1)',
                  }}
                  as="article" borderWidth='1px' >
               
            <Flex key={player.slug} p={4} >
              
                <Avatar
                  src={player.photo}
                  width="40px"
                  height="40px"
                />
              
              <Flex direction="column" ml={4}>
                <LinkOverlay href={`/player_profile/${player.slug}`} fontSize={"sm"}>
                  {player.name}
                </LinkOverlay>
      
                <Text fontSize={"x-small"}
                >{player.team.name}</Text>
              </Flex>
            </Flex>
            </LinkBox>
          );

    })}
  
  </div>
    

  }
  
  </div>



  );
};

export default SearchBar;