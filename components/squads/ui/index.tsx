import React, { useMemo } from "react";
import SquadsUI from "./SquadsUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";
import { PlayerInterface } from "../../../interfaces/PlayerInterface";
import { useSession } from "next-auth/react";

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



const SquadsCompIndex = ({experts} :  Props) => {

  const session  = useSession();





  let expertRow = useMemo (() => {

    let tempRow = [];
    while (experts.length) {
      tempRow.push(
        <HStack key={experts.length} marginBottom='50px'>
  
          {experts.splice(0, 2).map((expert) => {
  
  
            const isAuthor = (session?.data?.user?.id === expert._id) && session?.data?.user?.role === "commentator";
            return (
  
              <VStack key={expert.name} marginRight='40px' pointerEvents={isAuthor ? "auto" : "none"}>
                <Text fontSize='20px'>{expert?.name}</Text>
                <SquadsUI isAuthor={isAuthor} squad={expert?.squad} whichExpert={expert._id}></SquadsUI>
              </VStack>
            );
          })}
  
              
  
        </HStack>
      );
    }
    return tempRow;
  },[experts]);








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

export default SquadsCompIndex;