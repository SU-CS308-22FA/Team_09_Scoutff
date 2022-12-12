import React from "react";
import SquadsUI from "./SquadsUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";
import type { StatPlayers } from "../../pages/customsquads";


type Props = {
  data : StatPlayers[][];
}





const SquadsCompIndex = ({data} : Props) => {
  return (
    <div>
        <Flex  margin='100px' marginLeft='50px' marginTop='20px'>
          <VStack>
            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>Team of the week</Text>
                <SquadsUI data={data}></SquadsUI>  
                <Button>Like</Button>
              </VStack>

              <VStack >
                <Text fontSize='20px'>Team of the season</Text>
                <SquadsUI data={data}></SquadsUI>  
                <Button>Like</Button>
              </VStack>
            </HStack>

            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>Future Stars</Text>
                <SquadsUI data={data}></SquadsUI>  
                <Button>Like</Button>
              </VStack>

              <VStack >
                <Text fontSize='20px'>Old but gold</Text>
                <SquadsUI data={data}></SquadsUI>  
                <Button>Like</Button>
              </VStack>
            </HStack>
          </VStack>

          


        </Flex>
    </div>
  );
};

export default SquadsCompIndex;