import { Button, Flex, Heading, Image, Stack, Text, useBreakpointValue, useColorModeValue,Wrap,  Center,Table, Thead, Tbody,Tfoot, Tr, Th, Td,Container,TableCaption,TableContainer, Square, Circle, Box, HStack, Grid, Spacer, Divider, VStack, ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import router, { useRouter } from "next/router";

import type { StatPlayers } from "../../../pages/leaderboards";

import Link from "next/link";

type Props = {
  data : StatPlayers[][];
}


type LeaderboardProps = {
    data ?: Array<StatPlayers> ;
    name : string | undefined;
    LBplayers : string | undefined;
  
}

const converter = (data : string) => {
  data = data.toLowerCase();

  switch(data) {
    case "rating":
      return "statistics.rating";
    case "value":
      return "market_value";
    case "goals":
      return "statistics.attacking.goals"
    case "assists":
      return "statistics.passes.assists";
    case "cards":
      return "statistics.cards.yellow_cards";
    case "chances created":
      return "statistics.passes.big_chance_created";
    case "clean sheets":
      return "statistics.defending.clean_sheets";
    case "tackles":
      return "statistics.defending.tackles_per_game";
    case "shots":
      return "statistics.attacking.total_shots_per_game";

    
 

    default:
      return null;

}
}

/* const convertNested = (player : any, path : string)  {
  const arr = path.split(".");
  if (arr.length === 1) return player[path];
  return arr.reduceRight((acc, curr, index) => {
    if (acc === "") return player[curr];
    return player[curr][acc];
  }
  );
} */

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



  

/**
 * 
 * @param {data,name,LBplayers} is a LeaderboardProbs object
 * 
 *    LeaderboardProbs type was defined as :
 *    {data ?: Array<any> ;
 *    name : string | undefined;
 *    LBplayers : string | undefined;}
 *    corresponding variables are mapped to their respective 
 *    counterparts defined by this type.
 * 
 *    convertedIndex -> decide on the name that will be used 
 *    to retrieve data from the database. Same data has 2 different 
 *    names, first being the one used in literal leaderboards, and 
 *    second being the corresponding name for that data in the database
 * 
 *    data.map -> loop the players that are obtained by 'data'
 *    this is how the rows are formed( instead of writing 1,2,3,...)
 *    
 * @returns the structure of a single line in a leaderboard with the 
 *    structure of "index - player_name data"
 *    example: "2 - Ferdi Kadioglu 8"
 * 
 */
function Leaderboard({data,name,LBplayers} :  LeaderboardProps) {

  //const router = useRouter()
  const {isOpen, onClose, onOpen} = useDisclosure();

  const convertedIndex = converter(LBplayers ?? "");

  const playerData = data?.map((player,index) => {
    const data  = convertedIndex ?  convertNested(player,convertedIndex) : null



    return (
      <Tr key={index}>
        <Td>{index + 1} - <Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        <Td>{Number.isInteger(data) ? data : data?.toFixed(2)}</Td>
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


/**
 * 
 * @param {data} is a Probs object
 * Probs type was defined as:
 * {data : StatPlayers[][];}
 * 
 * 
 * @returns all of the leaderboard objects specified in
 * a css-styled composition
 */
export default function LeaderboardUI({data} : Props ) {




  const [dataRating,dataMarket,dataGoals,dataChances,dataAssists,dataYellow,dataClean,dataTackle,dataShots] = data



  return (
    
    <Box  bg='gray.100'>
      <Box bg='gray.100' h='50px'></Box>
      <Flex  marginBottom='50px' marginLeft='75px' marginRight='75px' >
        <Leaderboard name={"Top Ratings"} LBplayers="Rating" data={dataRating}></Leaderboard>
        <Spacer />
        <Leaderboard name="Top Scorers" data={dataGoals} LBplayers="Goals"></Leaderboard>
        <Spacer />
        <Leaderboard name="Highest market values" LBplayers="Value" data={dataMarket}></Leaderboard>
      </Flex>

      <Flex marginBottom='50px' marginLeft='75px' marginRight='75px' >
        <Leaderboard name="Top Assists" data={dataAssists} LBplayers="Assists"></Leaderboard>
        <Spacer />
        <Leaderboard name="Chances Created" data={dataChances}  LBplayers="Chances Created"></Leaderboard>
        <Spacer />
        <Leaderboard name="Successful Tackles (Per Game)" LBplayers="Tackles" data={dataTackle}></Leaderboard>
      </Flex>

      <Flex marginBottom='50px' marginLeft='75px' marginRight='75px' >
        <Leaderboard name="Yellow Cards" data={dataYellow}  LBplayers="Cards"></Leaderboard>
        <Spacer />
        <Leaderboard name="Total Shots (Per Game)" data={dataShots} LBplayers="Shots"></Leaderboard>
        <Spacer />
        <Leaderboard name="Clean sheets" LBplayers="Clean Sheets" data={dataClean}></Leaderboard>
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
