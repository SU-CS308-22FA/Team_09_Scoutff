import React from "react";
import SquadsUI from "./SquadsUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";
import type { StatPlayers } from "../../pages/customsquads";


type Props = {
  data : StatPlayers[][];
}

type SquadsProps = {
  data ?: Array<StatPlayers> ;
  name : string | undefined;
  LBplayers : string | undefined;

}

const converter = (data : string) => {
  data = data.toLowerCase();

  switch(data) {
    case "rating":
      return "statistics.rating"; 
    case "cards":
      return "statistics.cards.yellow_cards";
    default:
      return null;
  }

}

const SquadsCompIndex = ({children} : React.PropsWithChildren, {data} : Props) => {
  const [dataRating,dataYellow] = data
  return (
    <div>
        <Flex  margin='100px' marginLeft='200px' marginTop='20px'>
          <VStack>
            <HStack marginBottom='50px'>
              <VStack marginRight='140px'>
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
              <VStack marginRight='140px'>
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