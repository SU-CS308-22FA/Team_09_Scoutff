import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Wrap,
  Box,
  Center,
  HStack,
  VStack,
  Input,
  Tr,
  Link,
  Td,
  useDisclosure,
  Tbody,
  TableContainer,
  Table
} from "@chakra-ui/react";
import React from "react";
import type { StatPlayers } from "../../pages/customsquads";

function Player(str: { position: string | undefined, myData: JSX.Element[] | undefined}){
  
  
  return(<VStack>
    <Text fontSize='30px'>👕</Text>

    {/* <Input placeholder={str.position} _placeholder={{ opacity: 1, color: 'blue.700' }} size='sm' w='114px' /> */}

    <TableContainer w='160px'>

      <Table size="10px">
        <Tbody fontSize="14.4px" fontFamily="sans-serif">
          {str.myData}

        </Tbody>
        
      </Table>
    </TableContainer>
  </VStack> )
}

type Props = {
  data : StatPlayers[][];
}

type SquadProps = {
  data ?: Array<StatPlayers> ;
}

const convertNested = (player : any, path : string)  : number => {
  const arr = path.split(".");
  if (arr.length < 1) return 0;

  if (arr.length === 1) return player[path];


  return parseFloat(arr.reduce((acc : any, curr,index) => {


    if (acc === "") return player[curr];

    
    return acc[curr];
  },""
  ));
  
}


export default function SquadsUI({data} : Props) {

  var gkCheck= 0;
  var dfCheck= 0;
  var dfCheck1= 0;
  var dfCheck2= 0;
  var dfCheck3= 0;
  var mfCheck= 0;
  var mfCheck1= 0;
  var mfCheck2= 0;
  var fwCheck= 0;
  var fwCheck1= 0;
  var fwCheck2= 0;


  const [dataRating,dataYellow] = data

  

  
  const convertedIndex = "statistics.rating";
  const keeperData = dataRating?.map((player,index) => {
    const dataRating1  = convertedIndex ?  convertNested(player,convertedIndex): null
    if(player.position === "G" && gkCheck < 1){
      gkCheck++;
      return (
        <VStack>
          <Center>
            <Tr key={index}>
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
          </Center>
          <Center>
            {dataRating1}
          </Center>
        </VStack>
      )
    }else{
      return(<Tr></Tr>)
    }

  })

  const defenceData = dataRating?.map((player,index) => {
    const dataRating2  = convertedIndex ?  convertNested(player,convertedIndex): null

   
    if(player.position === "D" && dfCheck3 < 1 && dfCheck3 > -1){
      dfCheck3++;
      return (
        <VStack>
        <Center>
          <Tr key={index}>
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
        </Center>
          <Center>
            {dataRating2}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck3++;
      }
      return(<Tr></Tr>)
    }

  })

  const defenceData2 = dataRating?.map((player,index) => {
    const dataRating2  = convertedIndex ?  convertNested(player,convertedIndex): null

    if(player.position === "D" && dfCheck2 < 2 && dfCheck2 > 0){
      dfCheck2++;
      return (
        <VStack>

        <Center>
          <Tr key={index}>
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
        </Center>
                  <Center>
                  {dataRating2}
                </Center>
      
              </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck2++;
      }
      return(<Tr></Tr>)
    }

  })

  const defenceData3 = dataRating?.map((player,index) => {
    const dataRating2  = convertedIndex ?  convertNested(player,convertedIndex): null

    if(player.position === "D" && dfCheck1 < 3 && dfCheck1 > 1){
      dfCheck1++;
      return (
        <VStack>

        <Center>
        <Tr key={index}>
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
          {dataRating2}
        </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck1++;
      }
      return(<Tr></Tr>)
    }

  })

  const defenceData4 = dataRating?.map((player,index) => {
    const dataRating2  = convertedIndex ?  convertNested(player,convertedIndex): null

    if(player.position === "D" && dfCheck < 4 && dfCheck > 2){
      dfCheck++;
      return (

        <VStack>

        <Center>
        <Tr key={index}>
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
        {dataRating2}
        </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck++;
      }
      return(<Tr></Tr>)
    }

  })

  const midfieldData = dataRating?.map((player,index) => {
    const dataRating3  = convertedIndex ?  convertNested(player,convertedIndex): null
    if(player.position === "M" && mfCheck2 < 3  && mfCheck2 > 1){
      mfCheck2++;
      return (
        <VStack>

        <Center>
        <Tr key={index}>
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataRating3}
          </Center>

        </VStack>
        
      )
    }else{
      if(player.position === "M"){
        mfCheck2++;
      }
      return(<Tr></Tr>)
    }

  })

  const midfieldData2 = dataRating?.map((player,index) => {
    const dataRating3  = convertedIndex ?  convertNested(player,convertedIndex): null
    if(player.position === "M" && mfCheck1 < 2 && mfCheck1 > 0){
      mfCheck1++;
      return (
        <VStack>
        <Center>
        <Tr key={index}>
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
          <Center>
            {dataRating3}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "M"){
        mfCheck1++;
      }
      return(<Tr></Tr>)
    }

  })

  const midfieldData3 = dataRating?.map((player,index) => {
    const dataRating3  = convertedIndex ?  convertNested(player,convertedIndex): null
    if(player.position === "M" && mfCheck < 1 && mfCheck > -1){
      mfCheck++;
      return (
        <VStack>
        <Center>
        <Tr key={index}>
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
            {dataRating3}
          </Center>

        
        </VStack>
      )
    }else{
      if(player.position === "M"){
        mfCheck++;
      }
      return(<Tr></Tr>)
    }

  })

  const forwardData = dataRating?.map((player,index) => {
    const dataRating4  = convertedIndex ?  convertNested(player,convertedIndex): null
    if(player.position === "F" && fwCheck2 < 3  && fwCheck2 > 1){
      fwCheck2++;
      return (
        <VStack>
          <Center>
          <Tr key={index}>
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
            {dataRating4}
          </Center>

       
        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck2++;
      }
      return(<Tr></Tr>)
    }

  })

  const forwardData2 = dataRating?.map((player,index) => {
    const dataRating4  = convertedIndex ?  convertNested(player,convertedIndex): null
    if(player.position === "F" && fwCheck1 < 2  && fwCheck1 > 0){
      fwCheck1++;
      return (
        <VStack>
        <Center>
        <Tr key={index}>
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataRating4}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck1++;
      }
      return(<Tr></Tr>)
    }

  })

  const forwardData3 = dataRating?.map((player,index) => {
    const dataRating4  = convertedIndex ?  convertNested(player,convertedIndex): null
    if(player.position === "F" && fwCheck < 1  && fwCheck > -1){
      fwCheck++;
      return (
        <VStack>
        <Center>
        <Tr key={index}>
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataRating4}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck++;
      }
      return(<Tr></Tr>)
    }

  })

  


  return (
    <Flex>
      <HStack w='688px'>
        {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
      <Box backgroundImage='https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png' 
        backgroundSize='688px'
        backgroundRepeat="no-repeat"
        h='946px' flex='1'> 
        
        {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
        
        <Center marginTop='50px' fontSize='20px'>
          <Player position='F' myData={forwardData}></Player>


          
        </Center>

        <Center marginTop='50px' fontSize='20px'>
         
          <Player position='F' myData={forwardData2}></Player>

          
          <VStack marginX='60px'>
            <Player position='M' myData={midfieldData3}></Player>
          </VStack>

          <Player position='F' myData={forwardData3}></Player>

          
        </Center>

        <Center marginTop='105px' fontSize='20px'>
          <VStack marginRight='30px'>
            <Player position='M' myData={midfieldData2}></Player>
          </VStack>  

          <VStack marginLeft='30px'>
            <Player position='M' myData={midfieldData}></Player>
          </VStack>


        </Center>

        <Center marginTop='90px' fontSize='20px'>
          <VStack>
            <Player position='D' myData={defenceData}></Player>
          </VStack>  

          <VStack marginX='10px'>
            <Player position='D' myData={defenceData2}></Player>
          </VStack>

          <VStack marginX='10px'>
            <Player position='D' myData={defenceData3}></Player>
          </VStack>  

          <VStack>
            <Player position='D' myData={defenceData4}></Player>
          </VStack>

        </Center>

        <Center marginTop='50px' fontSize='20px'>
          
          <Player position='G' myData={keeperData}></Player>
        
        </Center>

        {/* id = 0 buraya kadar oyuncu yerleri */ }
      </Box>
      </HStack>
    </Flex>
  );

  function techStackButton(text: string) {
    return <Button rounded={"base"}>{text}</Button>;
  }
}
