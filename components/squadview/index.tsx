import React from "react";
import SquadsUItwo from "./SquadsViewUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";

const SquadsCompIndexTwo = ({data} :  any) => {
  let myData1;
  let myData2;
  let myData3;
  let myData4;

  for (let i = 0; i < data.length; i++) {
    if(data[i].num === "expert1"){
      myData1 = data[i];
      break;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if(data[i].num === "expert2"){
      myData2 = data[i];
      break;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if(data[i].num === "expert3"){
      myData3 = data[i];
      break;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if(data[i].num === "expert4"){
      myData4 = data[i];
      break;
    }
  }

  return (
    <div>
        <Flex  margin='100px' marginLeft='30px' marginTop='20px'>
          <VStack>
            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>{myData1?.name}</Text>
                <SquadsUItwo data={myData1} whichExpert="expert1"></SquadsUItwo>  

              </VStack>

              <VStack >
                <Text fontSize='20px'>{myData2?.name}</Text>
                <SquadsUItwo data={myData2} whichExpert="expert2"></SquadsUItwo>  

              </VStack>
            </HStack>

            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>{myData3?.name}</Text>
                <SquadsUItwo data={myData3} whichExpert="expert3"></SquadsUItwo>  

              </VStack>

              <VStack >
                <Text fontSize='20px'>{myData4?.name}</Text>
                <SquadsUItwo data={myData4} whichExpert="expert4"></SquadsUItwo>  

              </VStack>
            </HStack>
          </VStack>

        </Flex>
    </div>
  );
};

export default SquadsCompIndexTwo;