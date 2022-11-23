import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Wrap, 
  Center,Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Container,
  TableCaption,
  TableContainer, Square, Circle, Box, HStack, Grid, Spacer, Divider, VStack, ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import router, { useRouter } from "next/router";

import type { RatingPlayers, MarketPlayers } from "../../../pages/leaderboards";

type Props = {
  dataMarket : MarketPlayers[];
  dataRating : RatingPlayers[];
}


type LeaderboardProps = {
    data ?: Array<any> ;
    name : string | undefined;
    LBplayers : string | undefined;
  
}

const converter = (data : string) => {
  data = data.toLowerCase();

  switch(data) {
    case "rating":
      return "rating";
    case "value":
      return "market_value";
    default:
      return null;

}
}
  


function Leaderboard({data,name,LBplayers} :  LeaderboardProps) {
  //const router = useRouter()
  const {isOpen, onClose, onOpen} = useDisclosure();

  const convertedIndex = converter(LBplayers ?? "");

  const playerData = data?.map((player,index) => {
    return (
      <Tr key={index}>
        <Td>{index + 1} - {player.name}</Td>
        <Td>{convertedIndex ? player[convertedIndex] : null}</Td>
      </Tr>
    )
  })
  
  return(
    <>
    
      <Box marginX='10px' h='310px' w='400px' bg='white' borderColor='white' borderWidth='3px' borderRadius='3xl' overflow='auto'  > {/*sx={{ borderRadius: "10%" }}*/} 
      <VStack>
      <Box h='2px' w='200px' bg='white'></Box>
        <Center  color='black' fontFamily='heading' fontWeight={'semibold'} fontSize='18px'>{name} </Center>
         <Box h='10px' w='200px' bg='white'></Box>
         </VStack>

        <TableContainer>
          <Table color='black'  colorScheme='gray'>
          <TableCaption>
          <Center>
            {data ?
            <>
            <VStack>
            <Box h='7px' w='200px' bg='white'> </Box>
                      <Button marginX='5px' onClick={onOpen} background='black' textColor='white' borderRadius='xl' >See top 10 ➤</Button>     
                      </VStack>       
            </>
            : "No data available"}
     
            

          <Modal isOpen={isOpen}  onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
              <TableContainer>
                  <Table variant='simple'>
                    <TableCaption>{data ?
            <>     
                      <Button marginX='5px' onClick={() => router.push('/' + name)} background='black' textColor='white' borderRadius='xl' >See all ➤</Button>
            </>
            : "No data available"}  </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Player</Th>
                        <Th>{LBplayers}</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {playerData}

                    </Tbody>
                  </Table>
                </TableContainer>
              </ModalBody>
            </ModalContent>
            </Modal>        
         </Center>
          </TableCaption>
            <Thead>
              <Tr>
                
              </Tr>
            </Thead>
            <Tbody>
              {playerData?.slice(0,3)}


          
            </Tbody>
            
          </Table>
        </TableContainer>
      </Box>  
      
    </>
  )}


export default function LeaderboardUI({dataMarket,dataRating} : Props ) {


  return (
    
    <Box  bg='gray.100'>
      <Box bg='gray.100' h='50px'></Box>
      <Flex  marginBottom='50px' marginLeft='75px' marginRight='75px' >
        <Leaderboard name={"Top Ratings"} LBplayers="Rating" data={dataRating}></Leaderboard>
        <Spacer />
        <Leaderboard name="Top Scorers" LBplayers="Goals"></Leaderboard>
        <Spacer />
        <Leaderboard name="Highest market values" LBplayers="Value" data={dataMarket}></Leaderboard>
      </Flex>

      <Flex marginBottom='50px' marginLeft='75px' marginRight='75px' >
        <Leaderboard name="Top Assists" LBplayers="Assists"></Leaderboard>
        <Spacer />
        <Leaderboard name="Chances Created" LBplayers="Chances Created"></Leaderboard>
        <Spacer />
        <Leaderboard name="Successful Tackles" LBplayers="Tackles"></Leaderboard>
      </Flex>

      <Flex marginBottom='50px' marginLeft='75px' marginRight='75px' >
        <Leaderboard name="Yellow Cards" LBplayers="Cards"></Leaderboard>
        <Spacer />
        <Leaderboard name="Expected Goals" LBplayers="X-Goals"></Leaderboard>
        <Spacer />
        <Leaderboard name="Clean sheets" LBplayers="Clean Sheets"></Leaderboard>
      </Flex>
      <Box 
        bg={"gray.100"}
        color={useColorModeValue('gray.700', 'gray.200')}>
          <Box h='30px'>
          <Center>© 2022 Scoutff</Center>
          </Box>
      </Box>
    </Box>
    
  );

  
}
