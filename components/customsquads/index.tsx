import React from "react";
import SquadsUI from "./SquadsUI";
import { Text, Flex, VStack, HStack, Button, Toast, useToast, getToken } from "@chakra-ui/react";
import type { StatPlayers } from "../../pages/customsquads";
import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { getCsrfToken } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import { getLikes } from "../../lib/api/like";


type Props = {
  data : StatPlayers[][];
}


const SquadsCompIndex = ({data} : Props) => {

  const toast = useToast()

  var like1 = 0;
  var like2 = 0;
  var like3 = 0;
  var like4 = 0;


  const increaseLike1 = async() =>{
    toast({
      title: "Thank you for sharing your opinion",
      description: "Feedback is shared with the developers",
      status: "success",
      isClosable: true,
      duration: 4000
    })
    var name = "rating";
    await axios.post("/api/like", {
      name
    })

  }
  
  const increaseLike2 = async() =>{
    toast({
      title: "Thank you for sharing your opinion",
      description: "Feedback is shared with the developers",
      status: "success",
      isClosable: true,
      duration: 4000
    })
    var name = "young";
    await axios.post("/api/like", {
      name
    })

  }
  const increaseLike3 = async() =>{
    toast({
      title: "Thank you for sharing your opinion",
      description: "Feedback is shared with the developers",
      status: "success",
      isClosable: true,
      duration: 4000
    })
    var name = "old";
    await axios.post("/api/like", {
      name
    })

  }
  const increaseLike4 = async() =>{
    toast({
      title: "Thank you for sharing your opinion",
      description: "Feedback is shared with the developers",
      status: "success",
      isClosable: true,
      duration: 4000
    })
    var name = "yellow";
    await axios.post("/api/like", {
      name
    })

  }
  
  return (
    <div>
        <Flex  margin='100px' marginLeft='30px' marginTop='20px'>
          <VStack>
            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>Team of the season</Text>
                <SquadsUI data={data} title="rating"></SquadsUI>  
                <HStack borderRadius="20px" backgroundColor="blue.200" w="60px">
                  <Button onClick={increaseLike1} color="black" backgroundColor="blue.200" rounded="20px">Like</Button>
                  {/* <Text>{like1}</Text> */}
                </HStack>
              </VStack>
              <VStack >
                <Text fontSize='20px'>Youngsters of the season (U23)</Text>
                <SquadsUI data={data} title="young"></SquadsUI> 
                <HStack borderRadius="20px" backgroundColor="blue.200" w="60px">
                  <Button onClick={increaseLike2} color="black" backgroundColor="blue.200" rounded="20px">Like</Button>
                  {/* <Text>{like2}</Text> */}
                </HStack>
              </VStack>

            </HStack>

            <HStack marginBottom='50px'>
              <VStack marginRight='40px'>
                <Text fontSize='20px'>Oldest squad</Text>
                <SquadsUI data={data} title="aged"></SquadsUI>  
                <HStack borderRadius="20px" backgroundColor="blue.200" w="60px">
                  <Button onClick={increaseLike3} color="black" backgroundColor="blue.200" rounded="20px">Like</Button>
                  {/* <Text>{like3}</Text> */}
                </HStack>
              </VStack>
              <VStack>
                <Text fontSize='20px'>Most yellow cards</Text>
                <SquadsUI data={data} title="yellow" ></SquadsUI>  
                <HStack borderRadius="20px" backgroundColor="blue.200" w="60px">
                  <Button onClick={increaseLike4} color="black" backgroundColor="blue.200" rounded="20px">Like</Button>
                  {/* <Text>{like4}</Text> */}
                </HStack>
              </VStack>

            </HStack>
          </VStack>

          


        </Flex>
    </div>
  );
};

export default SquadsCompIndex;








{/*export const getServerSideProps  = async (context : GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  
  const count = await getLikes("rating")

  return {
    props: { 
      count
     },
  }
} */}