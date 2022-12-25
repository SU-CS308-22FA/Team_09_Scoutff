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
    useToast,
    Link
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import ExpertSquad from "../../models/Expertsquads";
  import dbConnect from "../../lib/mongoose";
  import { InferGetServerSidePropsType } from "next";
  
  
  
  
  export default function ShowcaseUI({data}: any) {  

    return (
      <Flex>
        <VStack>
        <HStack w='888px'>
          {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
        <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
   
          backgroundSize='1288px'
          backgroundRepeat="no-repeat"
          backgroundPosition= "top"
  
          h='646px' flex='1'> 
          
          {/* id = 0 buradan asaya kadar oyuncu yerleri */ }

          <Center marginTop='50px' fontSize='20px'>
            <VStack>
              <Image boxSize='40px' src={data?.stphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.stslug}`}>{data?.st}</Link>
              
            </VStack> 
  
  
            
          </Center>
  
          <Center marginTop='35px' fontSize='20px'>
           
            <VStack>
              <Image boxSize='40px' src={data?.lwphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lwslug}`}>{data?.lw}</Link>
            </VStack> 
  
            
            <VStack  marginX='100px'>
              <VStack>
                <Image boxSize='40px' src={data?.camphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.camslug}`}>{data?.cam}</Link>
              </VStack> 
            </VStack>
  
            <VStack>
              <Image boxSize='40px' src={data?.rwphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rwslug}`}>{data?.rw}</Link>
            </VStack> 
  
            
          </Center>
  
          <Center marginTop='40px' fontSize='20px'>
            <VStack marginRight='50px'>
              <VStack>
                <Image boxSize='40px' src={data?.lcmphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lcmslug}`}>{data?.lcm}</Link>
              </VStack> 
            </VStack>  
  
            <VStack  marginLeft='50px'>
              <VStack>
                <Image boxSize='40px' src={data?.rcmphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rcmslug}`}>{data?.rcm}</Link>
              </VStack> 
            </VStack>
  
  
          </Center>
  
          <Center marginTop='35px' fontSize='20px'>
            <VStack >
              <VStack>
                <Image boxSize='40px' src={data?.lbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lbslug}`}>{data?.lb}</Link>
              </VStack> 
            </VStack>  
  
            <VStack  marginX='40px'>
              <VStack>
                <Image boxSize='40px' src={data?.lcbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lcbslug}`}>{data?.lcb}</Link>
              </VStack> 
            </VStack>
  
            <VStack  marginX='40px'>
              <VStack>
                <Image boxSize='40px' src={data?.rcbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rcbslug}`}>{data?.rcb}</Link>
              </VStack> 
            </VStack>  
  
            <VStack >
              <VStack>
                <Image boxSize='40px' src={data?.rbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rbslug}`}>{data?.rb}</Link>
              </VStack> 
            </VStack>
  
          </Center>
  
          <Center marginTop='30px' fontSize='20px'>
            
              <VStack>
                <Image boxSize='40px' src={data?.gkphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
                <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.gkslug}`}>{data?.gk}</Link>
              </VStack> 
          
          </Center>
          
          {/* id = 0 buraya kadar oyuncu yerleri */ }
        </Box>
        
        </HStack>
        <Heading> {data.name} </Heading>
        <Text>Squad's Comment: {data?.comment}</Text>

        </VStack>
      </Flex>
      
    );
  
    function techStackButton(text: string) {
      return <Button rounded={"base"}>{text}</Button>;
    }
  }
  
  
  
  