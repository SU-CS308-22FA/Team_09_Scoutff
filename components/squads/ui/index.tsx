import React from "react";
import SquadsUI from "./SquadsUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";

const SquadsCompIndex = ({data} :  any) => {
  return (
    <div>
        <Flex  margin='100px' marginLeft='30px' marginTop='20px'>
          <VStack>
            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>First Expert</Text>
                <SquadsUI data={data}></SquadsUI>  

              </VStack>

              <VStack >
                <Text fontSize='20px'>Second Expert</Text>
                <SquadsUI data={data}></SquadsUI>  

              </VStack>
            </HStack>

            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>Third Expert</Text>
                <SquadsUI data={data}></SquadsUI>  

              </VStack>

              <VStack >
                <Text fontSize='20px'>Fourth Expert</Text>
                <SquadsUI data={data}></SquadsUI>  

              </VStack>
            </HStack>
          </VStack>

          


        </Flex>
    </div>
  );
};

export default SquadsCompIndex;