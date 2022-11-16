import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Wrap, 
  Center, Square, Circle, Box, HStack, Grid, Spacer, Divider
} from "@chakra-ui/react";
import React from "react";


export default function LeaderboardUI() {
  return (
    
    <Flex color='white' h='500px' marginTop='50px' marginLeft='60px' marginRight='60px' bg='gray.300' padding='30px' rounded='20'>


      <Box  w='100px' flex='1' bg='#647C90' sx={{ borderRadius: "10%" }} >
        <Center margin='20px' color='black' fontFamily='cursive' fontSize='18px'>Top Ratings</Center>
        <Divider color='gray.300'></Divider>
      </Box>
      <Box  w='100px' flex='1' bg='#647C90' marginX='40px' sx={{ borderRadius: "10%" }}>
        <Center margin='20px' color='black' fontFamily='cursive' fontSize='18px'>Top Scorers</Center>
        <Divider color='gray.300'></Divider>
      </Box>
      <Box  w='100px' flex='1' bg='#647C90' sx={{ borderRadius: "10%" }}>
        <Center margin='20px' color='black' fontFamily='cursive' fontSize='18px'>Market Values</Center>
        <Divider color='gray.300'></Divider>
      </Box>
    </Flex>
  );

  function techStackButton(text: string) {
    return <Button rounded={"base"}>{text}</Button>;
  }
}
