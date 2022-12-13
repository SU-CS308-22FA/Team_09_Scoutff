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
                <Text fontSize='20px'>Team of the season</Text>
                <SquadsUI data={data} title="rating"></SquadsUI>  
                <Button>Like</Button>
              </VStack>
              <VStack >
                <Text fontSize='20px'>Youngsters of the season (U21)</Text>
                <SquadsUI data={data} title="young"></SquadsUI>  
                <Button>Like</Button>
              </VStack>

            </HStack>

            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>Oldest squad</Text>
                <SquadsUI data={data} title="aged"></SquadsUI>  
                <Button>Like</Button>
              </VStack>
              <VStack >
                <Text fontSize='20px'>Most yellow cards</Text>
                <SquadsUI data={data} title="yellow" ></SquadsUI>  
                <Button>Like</Button>
              </VStack>

            </HStack>
          </VStack>

          


        </Flex>
    </div>
  );
};

export default SquadsCompIndex;