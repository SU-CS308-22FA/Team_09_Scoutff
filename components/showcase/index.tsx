import React from "react";
import ShowcaseUI from "./showcaseUI";
import { Text, Flex, VStack, HStack, Button, Center } from "@chakra-ui/react";

const ExpertShowcase = ({data} :  any) => {
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
        <Center>
        <Flex marginTop='20px'>
                <ShowcaseUI data={myData1} whichExpert="expert1"></ShowcaseUI>  

        </Flex>
        </Center>

    </div>
  );
};

export default ExpertShowcase;