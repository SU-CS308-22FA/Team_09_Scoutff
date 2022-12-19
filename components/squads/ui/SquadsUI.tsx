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
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import ExpertSquad from "../../../models/Expertsquads";
import dbConnect from "../../../lib/mongoose";
import { InferGetServerSidePropsType } from "next";

function Player(str: { position: string | undefined; }){
  return(<VStack>
    <Text fontSize='30px'>👕</Text>
    <Input  placeholder={str.position} _placeholder={{ opacity: 1, color: 'blue.700' }} size='sm' w='114px' />
    
  </VStack> )
}

export default function SquadsUI({data} :  any) {
  
  
  
  const [gkk, setValue1] = useState('');
  const [lbb, setValue2] = useState('');
  const [lcbb, setValue3] = useState('');
  const [rcbb, setValue4] = useState('');
  const [rbb, setValue5] = useState('');
  const [lcmm, setValue6] = useState('');
  const [rcmm, setValue7] = useState('');
  const [camm, setValue8] = useState('');
  const [lww, setValue9] = useState('');
  const [rww, setValue10] = useState('');
  const [stt, setValue11] = useState('');


  const toast = useToast()


  const createExpertsquad = async () => {

    const res  = await fetch('/api/expertsquad', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name: `Ridvan Dilmen`,
        comment: `this is my comment`,
        gk: gkk,
        lb: lbb,
        lcb: lcbb,
        rcb: rcbb,
        rb: rbb,
        lcm: lcmm,
        rcm: rcmm,
        cam: camm,
        lw: lww,
        rw: rww,
        st: stt,

      }),
    
    });

    const data = await res.json();

    toast({
      title: "Success",
      description: "Squad has been inserted",
      status: "success",
      duration: 2000,
      isClosable: true,
    })

    console.log(data);
  }


  return (
    <Flex>
      <VStack>
      <HStack w='688px'>
        {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
      <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
 
        backgroundSize='1288px'
        backgroundRepeat="no-repeat"
        backgroundPosition= "top"

        h='746px' flex='1'> 
        
        {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
        
        <Center marginTop='30px' fontSize='20px'>
          <VStack>
            <Text fontSize='30px'>👕</Text>
            <Input onChange={({target})=> setValue11(target?.value)} value={stt} placeholder={data[0].st} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            
          </VStack> 


          
        </Center>

        <Center marginTop='15px' fontSize='20px'>
         
          <VStack>
            <Text fontSize='30px'>👕</Text>
            <Input onChange={({target})=> setValue9(target?.value)} value={lww} placeholder={data[0].lw} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
          </VStack> 

          
          <VStack  marginX='100px'>
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input onChange={({target})=> setValue8(target?.value)} value={camm} placeholder={data[0].cam} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
          </VStack>

          <VStack>
            <Text fontSize='30px'>👕</Text>
            <Input onChange={({target})=> setValue10(target?.value)} value={rww} placeholder={data[0].rw} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
          </VStack> 

          
        </Center>

        <Center marginTop='20px' fontSize='20px'>
          <VStack marginRight='50px'>
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input onChange={({target})=> setValue6(target?.value)} value={lcmm} placeholder={data[0].lcm} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
          </VStack>  

          <VStack  marginLeft='50px'>
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input onChange={({target})=> setValue7(target?.value)} value={rcmm} placeholder={data[0].rcm} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
          </VStack>


        </Center>

        <Center marginTop='25px' fontSize='20px'>
          <VStack >
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input onChange={({target})=> setValue2(target?.value)} value={lbb} placeholder={data[0].lb} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
          </VStack>  

          <VStack  marginX='40px'>
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input onChange={({target})=> setValue3(target?.value)} value={lcbb} placeholder={data[0].lcb} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
          </VStack>

          <VStack  marginX='40px'>
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input value={rcbb} onChange={({target})=> setValue4(target?.value)} placeholder={data[0].rcb} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
          </VStack>  

          <VStack >
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input value={rbb} onChange={({target})=> setValue5(target?.value)} placeholder={data[0].rb} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
          </VStack>

        </Center>

        <Center marginTop='30px' fontSize='20px'>
          
            <VStack>
              <Text fontSize='30px'>👕</Text>
              <Input value={gkk} onChange={({target})=> setValue1(target?.value)} placeholder={data[0].gk} _placeholder={{ opacity: 1, color: 'white' }} size='sm' w='114px' />
            </VStack> 
        
        </Center>

        {/* id = 0 buraya kadar oyuncu yerleri */ }
      </Box>
      
      </HStack>

      <HStack>
        <Button onClick={createExpertsquad}>Save</Button>
        <Button>Like</Button>
      </HStack>
      </VStack>
    </Flex>
    
  );

  function techStackButton(text: string) {
    return <Button rounded={"base"}>{text}</Button>;
  }
}



