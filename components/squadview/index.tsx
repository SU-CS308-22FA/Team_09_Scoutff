import React from "react";
import SquadsUItwo from "./SquadsViewUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";
import { PlayerInterface } from "../../interfaces/PlayerInterface";
import Link from "next/link";

type Props = {
  experts : Array<{
    _id: string;
    name : string;
    squad: {
      comment : string;
      team: Array<PlayerInterface | {
        footballPosition: string;
      }>;
    } | null;
  }> ;
}


const SquadsCompIndexTwo = ({experts} :  Props) => {

  
  let expertRow = [];

  while (experts.length) {
    expertRow.push(
      <HStack key={experts.length} marginBottom='50px'>

        {experts.splice(0, 2).map((expert) => {
          return (
            <VStack key={expert.name} marginRight='40px'>
              <Link href={`/expert?load=${expert._id}`}>
            {expert?.name}
          </Link>
              <SquadsUItwo squad={expert?.squad} whichExpert={expert._id}></SquadsUItwo>
            </VStack>
          );
        })}

            

      </HStack>
    );
  }



  return (
    <div>
        <Flex  margin='100px' marginLeft='30px' marginTop='20px'>
          <VStack>
            {expertRow}
          </VStack>

        </Flex>
    </div>
  );
};

export default SquadsCompIndexTwo;