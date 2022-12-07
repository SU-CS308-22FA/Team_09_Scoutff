import {
    Box,
    Center,
    Flex,
    Image,
    Text,
    Heading,
    Stack,
    Link,
    Button,
    useColorModeValue,
    VStack,
    HStack,
    SimpleGrid,
    Table,
    Tr,
    Th,
    Td,
    Tbody,
    Thead,
  } from "@chakra-ui/react";
import { stat } from "fs";
import React from "react";

interface Props {
    shirt_number: string
    name: string
    image: string
    position: string
    details: string
    goals: number
    assists: number
    appearances: number 
    rating: number
    age: number
    // team: string
}


const PlayerPage: React.FC<Props> = ({shirt_number, name, image, position, details, goals, assists, appearances, rating, age /*team*/}) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
    <Box p="4" w="800px" mx="auto" textAlign="center" rounded="md" boxShadow="md">
      <Flex justifyContent="center" alignItems="center" mb="6">
        <HStack>
          <SimpleGrid columns={2} alignItems="center">
        <Image src={image} borderRadius='full' boxSize='200px'/>

        <VStack>
        <Heading size="md" fontWeight="bold" ml="4" color={"gray.800"}>
          {shirt_number} {name}
        </Heading>
        <Text fontSize="sm">{position} / {age}</Text>
        <Button colorScheme="twitter" mt="4">
        Add to favorites 🌟
      </Button>
        </VStack>
        </SimpleGrid>
        </HStack>
      </Flex>
      <Stack spacing="4" mt="4">
        <Text>{details}</Text>
      </Stack>
      <HStack p="4" w="full" mx="auto" rounded="md" boxShadow="md">
      <Table>
        <Th>
          <Thead>
          <Tr>
            <Td fontWeight="bold" textAlign="center">Goals</Td>
            <Td fontWeight="bold" textAlign="center">Assists</Td>
            <Td fontWeight="bold" textAlign="center">Appearances</Td>
            <Td fontWeight="bold" textAlign="center">Rating</Td>
          </Tr>
          </Thead>
        </Th>
        <Tbody>
          <Flex>
            <Tr>
              <Td textAlign="center">{goals}</Td>
              <Td textAlign="center">{assists}</Td>
              <Td textAlign="center">{appearances}</Td>
              <Td textAlign="center">{rating}</Td>
            </Tr>
            </Flex>         
        </Tbody>
      </Table>
    </HStack>
      </Box>
    </Flex>
    
  );
}


  function Player() {
    return (
      <PlayerPage
        name="Lionel Messi"
        image="https://www.gannett-cdn.com/presto/2020/08/25/USAT/842737a0-5b6c-47bc-adbc-ea5bef879661-Messi_gone.jpg"
        position="Forward"
        details="Lionel Andrés Messi is an Argentine professional footballer who plays as a forward and captains both Spanish club Barcelona and the Argentina national team."
        goals= {12}
        assists= {19}
        appearances= {10}
        rating= {9.8}
        age= {35}
        // team= "PSG"
        shirt_number = "#10"
      />
    );
  }
  
  export default Player;
  