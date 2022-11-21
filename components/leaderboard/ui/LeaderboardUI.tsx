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

function Leaderboard(str: { name: string | undefined; LBplayers: string | undefined; }){
  //const router = useRouter()
  const {isOpen, onClose, onOpen} = useDisclosure();
  return(
    <>
    
      <Box marginX='10px' h='310px' w='400px' bg='white' borderColor='white' borderWidth='3px' borderRadius='3xl' overflow='auto'  > {/*sx={{ borderRadius: "10%" }}*/} 
      <Center  color='black' fontFamily='heading' fontWeight={'semibold'} fontSize='18px'>{str.name} </Center>
            
        <TableContainer>
          <Table color='black'  colorScheme='gray'>
          <TableCaption>
          <Center>
          <Button onClick={() => router.push('/' + str.name)} background='black' textColor='white' borderRadius='xl' >See all ➤</Button>              
          <Button onClick={onOpen} background='black' textColor='white' borderRadius='xl' >See all ➤</Button>             {/*onClick={() => router.push('/' + str.name)}*/} 
          <Modal isOpen={isOpen}  onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
              <TableContainer>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>Player</Th>
                        <Th>{str.LBplayers}</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>P1</Td>
                        <Td>{str.LBplayers} 1</Td>
                      </Tr>
                      <Tr>
                        <Td>P2</Td>
                        <Td>{str.LBplayers} 2</Td>
                      </Tr>
                      <Tr>
                        <Td>P3</Td>
                        <Td>{str.LBplayers} 3</Td>
                      </Tr>
                      <Tr>
                        <Td>P4</Td>
                        <Td>{str.LBplayers} 4</Td>
                      </Tr>
                      <Tr>
                        <Td>P5</Td>
                        <Td>{str.LBplayers} 5</Td>
                      </Tr>
                      <Tr>
                        <Td>P6</Td>
                        <Td>{str.LBplayers} 6</Td>
                      </Tr> <Tr>
                        <Td>P7</Td>
                        <Td>{str.LBplayers} 7</Td>
                      </Tr>
                      <Tr>
                        <Td>P8</Td>
                        <Td>{str.LBplayers} 8</Td>
                      </Tr>
                      <Tr>
                        <Td>P9</Td>
                        <Td>{str.LBplayers} 9</Td>
                      </Tr>
                      <Tr>
                        <Td>P10</Td>
                        <Td>{str.LBplayers} 10</Td>
                      </Tr>
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
                <Th>Player</Th>
                <Th>{str.LBplayers}</Th>
              </Tr>
            </Thead>
            <Tbody>
            <Tr>
            <Td>P1</Td>
            <Td>{str.LBplayers} 1</Td>
          </Tr>
          <Tr>
            <Td>P2</Td>
            <Td>{str.LBplayers} 2</Td>
          </Tr>
          <Tr>
            <Td>P3</Td>
            <Td>{str.LBplayers} 3</Td>
          </Tr>
          
            </Tbody>
            
          </Table>
        </TableContainer>
      </Box>  
      
    </>
  )}


export default function LeaderboardUI() {
  return (
    
    <Box  bg='gray.100'>
      <Box bg='gray.100' h='50px'></Box>
      <Flex  marginBottom='50px' marginLeft='75px' marginRight='75px' >
        <Leaderboard name={"Top Ratings"} LBplayers="Rating"></Leaderboard>
        <Spacer />
        <Leaderboard name="Top Scorers" LBplayers="Goals"></Leaderboard>
        <Spacer />
        <Leaderboard name="Top Market Values" LBplayers="Value"></Leaderboard>
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
