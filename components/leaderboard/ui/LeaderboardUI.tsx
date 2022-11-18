import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Wrap, 
  Center, Square, Circle, Box, HStack, Grid, Spacer, Divider, VStack, Input, 
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

function Leaderboard(str: { name: string | undefined; }){
  const router = useRouter()

  return(
      <Box marginX='40px' w='100px' flex='1' bg='blue.600' sx={{ borderRadius: "10%" }} >
        <Center margin='20px' color='black' fontFamily='cursive' fontSize='18px'>{str.name}</Center>
        <Center>
          <Divider color='gray.300' w='300px'></Divider>
        </Center>

        <Center>
          <Button onClick={() => router.push('/' + str.name)} background='blue.600' marginTop='380px'>More ➤</Button>
        </Center>
      </Box>
  )}


export default function LeaderboardUI() {
  return (
    
    <Spacer color='white' marginTop='50px' marginLeft='30px' marginRight='30px' padding='30px' rounded='20'>
      
      <Flex marginBottom='30px' h='500px'>
        <Leaderboard name="Top Ratings"></Leaderboard>
        <Leaderboard name="Top Scorers"></Leaderboard>
        <Leaderboard name="Top Market Values"></Leaderboard>
      </Flex>

      <Flex marginBottom='30px' h='500px'>
        <Leaderboard name="Top Assists"></Leaderboard>
        <Leaderboard name="Chances Created"></Leaderboard>
        <Leaderboard name="Successful Tackles"></Leaderboard>
      </Flex>

      <Flex marginBottom='30px' h='500px'>
        <Leaderboard name="Yellow Cards"></Leaderboard>
        <Leaderboard name="Expected Goals"></Leaderboard>
        <Leaderboard name="Clean sheets"></Leaderboard>
      </Flex>
    </Spacer>

    
  );

  function techStackButton(text: string) {
    return <Button rounded={"base"}>{text}</Button>;
  }
}
