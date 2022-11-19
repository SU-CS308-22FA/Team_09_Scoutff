import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Wrap, 
  Center,Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Square, Circle, Box, HStack, Grid, Spacer, Divider, VStack, ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

function Leaderboard(str: { name: string | undefined; LBplayers: string | undefined; }){
  //const router = useRouter()
  const {isOpen, onClose, onOpen} = useDisclosure();
  return(
    <>
    
     {str.LBplayers}
      <Box marginX='30px' h='450px' w='250px' flex='1' borderColor='black' borderWidth='3px' borderRadius='lg' overflow='hidden'  > {/*sx={{ borderRadius: "10%" }}*/} 
      <Center  color='black' fontFamily='arial' fontSize='18px'>{str.name}</Center>
            <Center>
              <Divider color='gray.300' w='300px' ></Divider>
            </Center>
        <TableContainer>
          <Table color='black' variant='striped' colorScheme='gray'>
          <TableCaption>
          <Center>
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
          <Tr>
            <Td>P4</Td>
            <Td>{str.LBplayers} 4</Td>
          </Tr>
          <Tr>
            <Td>P5</Td>
            <Td>{str.LBplayers} 5</Td>
          </Tr>
            </Tbody>
            
          </Table>
        </TableContainer>

        
      </Box>  
      
    </>
  )}


export default function LeaderboardUI() {
  return (
    
    <Spacer color='white' marginTop='50px' marginLeft='30px' marginRight='30px' padding='10px' rounded='20'>
      
      <Flex marginBottom='150px' h='380px'>
        <Leaderboard name="Top Ratings" LBplayers="Rating"></Leaderboard>
        <Leaderboard name="Top Scorers" LBplayers="Goals"> </Leaderboard>
        <Leaderboard name="Top Market Values" LBplayers="Value"></Leaderboard>
      </Flex>

      <Flex marginBottom='150px' h='380px'>
        <Leaderboard name="Top Assists" LBplayers="Assists"></Leaderboard>
        <Leaderboard name="Chances Created" LBplayers="Chances Creates"></Leaderboard>
        <Leaderboard name="Successful Tackles" LBplayers="Successful Tackles"></Leaderboard>
      </Flex>

      <Flex marginBottom='150px' h='380px'>
        <Leaderboard name="Yellow Cards" LBplayers="Yellow Cards"></Leaderboard>
        <Leaderboard name="Expected Goals" LBplayers="X-Goals"></Leaderboard>
        <Leaderboard name="Clean sheets" LBplayers="Clean Sheets"></Leaderboard>
      </Flex>
    </Spacer>

    
  );

  
}
