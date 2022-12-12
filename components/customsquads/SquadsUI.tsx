import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Wrap,
  Box,
  Center,
  HStack,
  VStack,
  Input,
  Tr,
  Link,
  Td,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import type { StatPlayers } from "../../pages/customsquads";

function Player(str: { position: string | undefined; }){
  return(<VStack>
    <Text fontSize='30px'>👕</Text>
    <Input placeholder={str.position} _placeholder={{ opacity: 1, color: 'blue.700' }} size='sm' w='114px' />
    
  </VStack> )
}

type Props = {
  data : StatPlayers[][];
}

type SquadProps = {
  data ?: Array<StatPlayers> ;
}

const convertNested = (player : any, path : string)  : number => {
  const arr = path.split(".");
  if (arr.length < 1) return 0;

  if (arr.length === 1) return player[path];


  return parseFloat(arr.reduce((acc : any, curr,index) => {


    if (acc === "") return player[curr];

    
    return acc[curr];
  },""
  ));
  
}


export default function SquadsUI({data} : SquadProps) {

  const convertedIndex = "statistics.rating";
  
  const playerData = data?.map((player,index) => {
    const data  = convertedIndex ?  convertNested(player,convertedIndex): null


    return (
      <Tr key={index}>
        <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        <Td>{data}</Td>
      </Tr>
    )
  })


  return (
    <Flex>
      <HStack w='480px'>
      <Box backgroundImage='https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png' 
        backgroundSize='480px'
        backgroundRepeat="no-repeat"
        h='660px' flex='1'> 
        
        {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
        
        <Center marginTop='30px' fontSize='20px'>
          <Player position='ST'></Player>
          {playerData?.slice(0,1)}
        </Center>

        <Center marginTop='40px' fontSize='20px'>
         
          <Player position='LM'></Player>
          {playerData?.slice(1,2)}

          
          <VStack marginX='30px'>
            <Player position='CAM'></Player>
            {playerData?.slice(2,3)}
          </VStack>

          <Player position='RM'></Player>
          {playerData?.slice(3,4)}

          
        </Center>

        <Center marginTop='60px' fontSize='20px'>
          <VStack marginRight='15px'>
            <Player position='CDM'></Player>
            {playerData?.slice(4,5)}
          </VStack>  

          <VStack marginLeft='15px'>
            <Player position='CDM'></Player>
            {playerData?.slice(5,6)}
          </VStack>


        </Center>

        <Center marginTop='50px' fontSize='20px'>
          <VStack>
            <Player position='LB'></Player>
            {playerData?.slice(6,7)}
          </VStack>  

          <VStack marginX='5px'>
            <Player position='CB'></Player>
            {playerData?.slice(7,8)}
          </VStack>

          <VStack marginX='5px'>
            <Player position='CB'></Player>
            {playerData?.slice(8,9)}
          </VStack>  

          <VStack>
            <Player position='RB'></Player>
            {playerData?.slice(9,10)}
          </VStack>

        </Center>

        <Center marginTop='20px' fontSize='20px'>
          
          <Player position='GK'></Player>
          {playerData?.slice(10,11)}
        
        </Center>

        {/* id = 0 buraya kadar oyuncu yerleri */ }
      </Box>
      </HStack>
    </Flex>
  );

  function techStackButton(text: string) {
    return <Button rounded={"base"}>{text}</Button>;
  }
}
