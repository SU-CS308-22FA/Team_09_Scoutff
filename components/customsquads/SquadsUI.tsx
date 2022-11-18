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
  Input
} from "@chakra-ui/react";
import React from "react";

function Player(str: { position: string | undefined; }){
  return(<VStack>
    <Text fontSize='30px'>👕</Text>
    <Input placeholder={str.position} _placeholder={{ opacity: 1, color: 'blue.700' }} size='sm' w='114px' />
    
  </VStack> )
}

export default function SquadsUI() {
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
        </Center>

        <Center marginTop='40px' fontSize='20px'>
         
          <Player position='LM'></Player>
          
          <VStack marginX='30px'>
            <Player position='CAM'></Player>
          </VStack>

          <Player position='RM'></Player>
          
        </Center>

        <Center marginTop='60px' fontSize='20px'>
          <VStack marginRight='15px'>
            <Player position='CDM'></Player>
          </VStack>  

          <VStack marginLeft='15px'>
            <Player position='CDM'></Player>
          </VStack>


        </Center>

        <Center marginTop='50px' fontSize='20px'>
          <VStack>
            <Player position='LB'></Player>
          </VStack>  

          <VStack marginX='5px'>
            <Player position='CB'></Player>
          </VStack>

          <VStack marginX='5px'>
            <Player position='CB'></Player>
          </VStack>  

          <VStack>
            <Player position='RB'></Player>
          </VStack>

        </Center>

        <Center marginTop='20px' fontSize='20px'>
          
          <Player position='GK'></Player>
        
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
