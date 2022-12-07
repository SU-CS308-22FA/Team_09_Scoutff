import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Wrap, 
    Center, Square, Circle, Box, HStack, VStack, Grid, Spacer, Divider, background
  } from "@chakra-ui/react";
  import React from "react";
  import { useRouter } from 'next/router'
  import { useControllableProp, useControllableState } from '@chakra-ui/react'
  

  export default function SquareClickable() {
    const router = useRouter()

    return (
      
      <Flex h='550px' marginTop='50px' marginLeft='60px' marginRight='60px' padding='30px' rounded='20'>
            <Button onClick={() => router.push('/squads')} sx={{ borderRadius: "2%" }} h='200px' alignSelf='center' margin='100px' flex='1' color='black' bg='blue.600' fontFamily='cursive' fontSize='18px'>Experts' Squad</Button>

            <Button onClick={() => router.push('/customsquads')} sx={{ borderRadius: "2%" }} h='200px' alignSelf='center' margin='100px' flex='1' color='black' bg='blue.600' fontFamily='cursive' fontSize='18px'>Scoutff Squad</Button>
      </Flex>
    );
  }

