import {
    Flex,
    Heading,
    Image,
    Text,
    Box,
    Center,
    HStack,
    VStack,
    Link
  } from "@chakra-ui/react";
  import React, { useCallback, useState } from "react";
  
  
type Players = Array<{
  footballPosition ?: string,
  photo ?: string,
  slug ?: string,
  name ?: string,
}>


type Props = {
    players : Players,
    name : string,
    comment : string
}

  export default function RealShowcaseUI({players,name,comment} : Props) {  

    console.log(players)



    const playerByPos = useCallback((footballPosition : string) => {
        return players.find(player => player.footballPosition === footballPosition)
        
    },[players])

    const playerStack = useCallback((footballPosition : string) => {
        const player = playerByPos(footballPosition)
        

        return (
            <VStack>
            <Image boxSize='40px' src={player?.photo} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${player?.slug}`}>{player?.name}</Link>
          </VStack> 
        )

      

    },[players])
        

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
            {playerStack('ST')}
  
            
          </Center>
  
          <Center marginTop='35px' fontSize='20px'>
           
          {playerStack('LW')}

  
            
            <VStack  marginX='100px'>
                {playerStack('CAM')}

            </VStack>
  
            {playerStack('RW')}

  
            
          </Center>
  
          <Center marginTop='40px' fontSize='20px'>
            <VStack marginRight='50px'>
            {playerStack('LCM')}

            </VStack>  
  
            <VStack  marginLeft='50px'>
            {playerStack('RCM')}

            </VStack>
  
  
          </Center>
  
          <Center marginTop='35px' fontSize='20px'>
            <VStack >
            {playerStack('LB')}

            </VStack>  
  
            <VStack  marginX='40px'>
            {playerStack('LCB')}

            </VStack>
  
            <VStack  marginX='40px'>
            {playerStack('RCB')}

            </VStack>  
  
            <VStack >
            {playerStack('RB')}

            </VStack>
  
          </Center>
  
          <Center marginTop='30px' fontSize='20px'>
            
          {playerStack('GK')}

          
          </Center>
          
          {/* id = 0 buraya kadar oyuncu yerleri */ }
        </Box>
        
        </HStack>

        <Heading> {name} </Heading>
        <Text>Squad's Comment: {comment}</Text>




        </VStack>
      </Flex>
      
    );

  

  }
  
  
  
  