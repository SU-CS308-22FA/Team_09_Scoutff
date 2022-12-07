import React from "react";
import SquadsUI from "./SquadsUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";

const SquadsCompIndex = () => {
  return (
    <div>
        <Flex  margin='100px' marginLeft='200px' marginTop='20px'>
          <VStack>
            <HStack marginBottom='50px'>
              <VStack marginRight='140px'>
                <Text fontSize='20px'>Team of the week</Text>
                <SquadsUI></SquadsUI>  
                <Button>Like</Button>
              </VStack>

              <VStack >
                <Text fontSize='20px'>Team of the season</Text>
                <SquadsUI></SquadsUI>  
                <Button>Like</Button>
              </VStack>
            </HStack>

            <HStack marginBottom='50px'>
              <VStack marginRight='140px'>
                <Text fontSize='20px'>Future Stars</Text>
                <SquadsUI></SquadsUI>  
                <Button>Like</Button>
              </VStack>

              <VStack >
                <Text fontSize='20px'>Old but gold</Text>
                <SquadsUI></SquadsUI>  
                <Button>Like</Button>
              </VStack>
            </HStack>
          </VStack>

          


        </Flex>
    </div>
  );
};

export default SquadsCompIndex;