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

    {/* <Input placeholder={str.position} _placeholder={{ opacity: 1, color: 'blue.700' }} size='sm' w='114px' /> */}

    <TableContainer w='170px'>

      <Table size="10px">
        <Tbody fontSize="14px" fontFamily="sans-serif" fontWeight={"bold"}>
          {str.myData}

        </Tbody>
        
      </Table>
    </TableContainer>
  </VStack> )
}

type Props = {
  data : StatPlayers[][];
  title: string
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


export default function SquadsUI({data, title} : Props) {
  

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


  const [dataRating,dataYellow,dataAge] = data

  
  
    const convertedIndex = "statistics.rating";
    const keeperData = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "G" && gkCheck < 1){
        gkCheck++;
        return (
          <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
            <Center>
              <Tr key={player.name} >
                <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
              </Tr>
            </Center>
            <Center>
              {dataRating?.toFixed(2)}
            </Center>
          </VStack>
        )
      }else{
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceData = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null

    
      if(player.position === "D" && dfCheck3 < 1 && dfCheck3 > -1){
        dfCheck3++;
        return (
          <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
          </Center>
            <Center>
              {dataRating?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "D"){
          dfCheck3++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceData2 = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null

      if(player.position === "D" && dfCheck2 < 2 && dfCheck2 > 0){
        dfCheck2++;
        return (
          <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
          </Center>
                    <Center>
                    {dataRating?.toFixed(2)}
                  </Center>
        
                </VStack>
        )
      }else{
        if(player.position === "D"){
          dfCheck2++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceData3 = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null

      if(player.position === "D" && dfCheck1 < 3 && dfCheck1 > 1){
        dfCheck1++;
        return (
          <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
            {dataRating?.toFixed(2)}
          </Center>

          </VStack>
        )
      }else{
        if(player.position === "D"){
          dfCheck1++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceData4 = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null

      if(player.position === "D" && dfCheck < 4 && dfCheck > 2){
        dfCheck++;
        return (

          <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
          {dataRating?.toFixed(2)}
          </Center>

          </VStack>
        )
      }else{
        if(player.position === "D"){
          dfCheck++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const midfieldData = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "M" && mfCheck2 < 3  && mfCheck2 > 1){
        mfCheck2++;
        return (
          <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
          <Center>
              {dataRating?.toFixed(2)}
            </Center>

          </VStack>
          
        )
      }else{
        if(player.position === "M"){
          mfCheck2++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const midfieldData2 = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "M" && mfCheck1 < 2 && mfCheck1 > 0){
        mfCheck1++;
        return (
          <VStack key={player.name}>
                        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
            <Center>
              {dataRating?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "M"){
          mfCheck1++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const midfieldData3 = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "M" && mfCheck < 1 && mfCheck > -1){
        mfCheck++;
        return (
          <VStack key={player.name}>
                        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
              {dataRating?.toFixed(2)}
            </Center>

          
          </VStack>
        )
      }else{
        if(player.position === "M"){
          mfCheck++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const forwardData = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "F" && fwCheck2 < 3  && fwCheck2 > 1){
        fwCheck2++;
        return (
          <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>            
            <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
            </Center>

            <Center>
              {dataRating?.toFixed(2)}
            </Center>

        
          </VStack>
        )
      }else{
        if(player.position === "F"){
          fwCheck2++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const forwardData2 = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "F" && fwCheck1 < 2  && fwCheck1 > 0){
        fwCheck1++;
        return (
          <VStack key={player.name}>
                        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
          <Center>
              {dataRating?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "F"){
          fwCheck1++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const forwardData3 = dataRating?.map((player,index) => {
      const dataRating  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "F" && fwCheck < 1  && fwCheck > -1){
        fwCheck++;
        return (
          <VStack key={player.name}>
                        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
          <Center>
              {dataRating?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "F"){
          fwCheck++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })
  

   gkCheck= 0;
   dfCheck= 0;
   dfCheck1= 0;
   dfCheck2= 0;
   dfCheck3= 0;
   mfCheck= 0;
   mfCheck1= 0;
   mfCheck2= 0;
   fwCheck= 0;
   fwCheck1= 0;
   fwCheck2= 0;


  

  

  
  const convertedIndex2 = "statistics.cards.yellow_cards";
  const keeperDataYellow = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null
    if(player.position === "G" && gkCheck < 1 ){
      gkCheck++;
      return (
        <VStack key={player.name}>
                      <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
          <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
          </Center>
          <Center>
            {dataYellow}
          </Center>
        </VStack>
      )
    }else{
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataYellow1 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null

   
    if(player.position === "D" && dfCheck3 < 1 && dfCheck3 > -1){
      dfCheck3++;
      return (
        <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
        <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
        </Center>
          <Center>
            {dataYellow}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck3++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataYellow2 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null

    if(player.position === "D" && dfCheck2 < 2 && dfCheck2 > 0){
      dfCheck2++;
      return (
        <VStack key={player.name}>
            <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
            </Center>
        <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
        </Center>
                  <Center>
                  {dataYellow}
                </Center>
      
              </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck2++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataYellow3 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null

    if(player.position === "D" && dfCheck1 < 3 && dfCheck1 > 1){
      dfCheck1++;
      return (
        <VStack key={player.name}>
          <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
          </Center>

        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
          {dataYellow}
        </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck1++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataYellow4 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null

    if(player.position === "D" && dfCheck < 4 && dfCheck > 2){
      dfCheck++;
      return (

        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
        {dataYellow}
        </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const midfieldDataYellow = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null
    if(player.position === "M" && mfCheck2 < 3  && mfCheck2 > 1){
      mfCheck2++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataYellow}
          </Center>

        </VStack>
        
      )
    }else{
      if(player.position === "M"){
        mfCheck2++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const midfieldDataYellow2 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null
    if(player.position === "M" && mfCheck1 < 2 && mfCheck1 > 0){
      mfCheck1++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>          
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
          <Center>
            {dataYellow}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "M"){
        mfCheck1++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const midfieldDataYellow3 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null
    if(player.position === "M" && mfCheck < 1 && mfCheck > -1){
      mfCheck++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>          
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
            {dataYellow}
          </Center>

        
        </VStack>
      )
    }else{
      if(player.position === "M"){
        mfCheck++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const forwardDataYellow = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null
    if(player.position === "F" && fwCheck2 < 3  && fwCheck2 > 1){
      fwCheck2++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>          
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
            {dataYellow}
          </Center>

       
        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck2++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const forwardDataYellow2 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null
    if(player.position === "F" && fwCheck1 < 2  && fwCheck1 > 0){
      fwCheck1++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>          
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataYellow}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck1++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const forwardDataYellow3 = dataYellow?.map((player,index) => {
    const dataYellow  = convertedIndex2 ?  convertNested(player,convertedIndex2): null
    if(player.position === "F" && fwCheck < 1  && fwCheck > -1){
      fwCheck++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataYellow}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })








  gkCheck= 0;
   dfCheck= 0;
   dfCheck1= 0;
   dfCheck2= 0;
   dfCheck3= 0;
   mfCheck= 0;
   mfCheck1= 0;
   mfCheck2= 0;
   fwCheck= 0;
   fwCheck1= 0;
   fwCheck2= 0;


  

  

  
  const convertedIndex3 = "age";
  const keeperDataAge = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null
    if(player.position === "G" && gkCheck < 1){
      gkCheck++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
          </Center>
          <Center>
            {dataAge}
          </Center>
        </VStack>
      )
    }else{
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataAge1 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null

   
    if(player.position === "D" && dfCheck3 < 1 && dfCheck3 > -1){
      dfCheck3++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
        </Center>
          <Center>
            {dataAge}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck3++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataAge2 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null

    if(player.position === "D" && dfCheck2 < 2 && dfCheck2 > 0){
      dfCheck2++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
        </Center>
                  <Center>
                  {dataAge}
                </Center>
      
              </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck2++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataAge3 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null

    if(player.position === "D" && dfCheck1 < 3 && dfCheck1 > 1){
      dfCheck1++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
          {dataAge}
        </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck1++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const defenceDataAge4 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null

    if(player.position === "D" && dfCheck < 4 && dfCheck > 2){
      dfCheck++;
      return (

        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
        {dataAge}
        </Center>

        </VStack>
      )
    }else{
      if(player.position === "D"){
        dfCheck++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const midfieldDataAge = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null
    if(player.position === "M" && mfCheck2 < 3  && mfCheck2 > 1){
      mfCheck2++;
      return (
        <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataAge}
          </Center>

        </VStack>
        
      )
    }else{
      if(player.position === "M"){
        mfCheck2++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const midfieldDataAge2 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null
    if(player.position === "M" && mfCheck1 < 2 && mfCheck1 > 0){
      mfCheck1++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
          <Center>
            {dataAge}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "M"){
        mfCheck1++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const midfieldDataAge3 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null
    if(player.position === "M" && mfCheck < 1 && mfCheck > -1){
      mfCheck++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>

        <Center>
            {dataAge}
          </Center>

        
        </VStack>
      )
    }else{
      if(player.position === "M"){
        mfCheck++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const forwardDataAge = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null
    if(player.position === "F" && fwCheck2 < 3  && fwCheck2 > 1){
      fwCheck2++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
            {dataAge}
          </Center>

       
        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck2++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const forwardDataAge2 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null
    if(player.position === "F" && fwCheck1 < 2  && fwCheck1 > 0){
      fwCheck1++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataAge}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck1++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })

  const forwardDataAge3 = dataAge?.map((player,index) => {
    const dataAge  = convertedIndex3 ?  convertNested(player,convertedIndex3): null
    if(player.position === "F" && fwCheck < 1  && fwCheck > -1){
      fwCheck++;
      return (
        <VStack key={player.name}>
                  <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
        <Center>
        <Tr key={player.name} >
          <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
        </Tr>
        </Center>
        <Center>
            {dataAge}
          </Center>

        </VStack>
      )
    }else{
      if(player.position === "F"){
        fwCheck++;
      }
      return(<Tr key={player.name}></Tr>)
    }

  })




   gkCheck= 0;
   dfCheck= 0;
   dfCheck1= 0;
   dfCheck2= 0;
   dfCheck3= 0;
   mfCheck= 0;
   mfCheck1= 0;
   mfCheck2= 0;
   fwCheck= 0;
   fwCheck1= 0;
   fwCheck2= 0;


  

  
  
    
    const keeperDataYoung = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "G" && gkCheck < 1 && player.age < 24){
        gkCheck++;
        return (
          <VStack key={player.name}>
                    <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
            <Center>
              <Tr key={player.name} >
                <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
              </Tr>
            </Center>
            <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>
          </VStack>
        )
      }else{
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceDataYoung = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null

    
      if(player.position === "D" && dfCheck3 < 1 && dfCheck3 > -1 && player.age < 24){
        dfCheck3++;
        return (
          <VStack key={player.name}>
                    <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
          </Center>
            <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "D" && player.age < 24){
          dfCheck3++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceDataYoung2 = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null

      if(player.position === "D" && dfCheck2 < 2 && dfCheck2 > 0 && player.age < 24){
        dfCheck2++;
        return (
          <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
          </Center>
                    <Center>
                    {dataRatingYoung?.toFixed(2)}
                  </Center>
        
                </VStack>
        )
      }else{
        if(player.position === "D" && player.age < 22){
          dfCheck2++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceDataYoung3 = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null

      if(player.position === "D" && dfCheck1 < 3 && dfCheck1 > 1 && player.age < 24){
        dfCheck1++;
        return (
          <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"}  src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
            {dataRatingYoung?.toFixed(2)}
          </Center>

          </VStack>
        )
      }else{
        if(player.position === "D" && player.age < 24){
          dfCheck1++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const defenceDataYoung4 = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null

      if(player.position === "D" && dfCheck < 4 && dfCheck > 2 && player.age < 24){
        dfCheck++;
        return (

          <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
          {dataRatingYoung?.toFixed(2)}
          </Center>

          </VStack>
        )
      }else{
        if(player.position === "D" && player.age < 24){
          dfCheck++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const midfieldDataYoung = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "M" && mfCheck2 < 3  && mfCheck2 > 1 && player.age < 24){
        mfCheck2++;
        return (
          <VStack key={player.name}>
        <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
          <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>

          </VStack>
          
        )
      }else{
        if(player.position === "M" && player.age < 24){
          mfCheck2++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const midfieldDataYoung2 = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "M" && mfCheck1 < 2 && mfCheck1 > 0 && player.age < 24 ){
        mfCheck1++;
        return (
          <VStack key={player.name}>
                    <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
            <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "M" && player.age < 24){
          mfCheck1++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const midfieldDataYoung3 = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "M" && mfCheck < 1 && mfCheck > -1 && player.age < 24){
        mfCheck++;
        return (
          <VStack key={player.name}>
                    <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>

          <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>

          
          </VStack>
        )
      }else{
        if(player.position === "M" && player.age < 24){
          mfCheck++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const forwardDataYoung = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "F" && fwCheck2 < 3  && fwCheck2 > 1 && player.age < 24){
        fwCheck2++;
        return (
          <VStack key={player.name}>
                    <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
            <Center>
            <Tr key={player.name} >
              <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
            </Tr>
            </Center>

            <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>

        
          </VStack>
        )
      }else{
        if(player.position === "F" && player.age < 24){
          fwCheck2++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const forwardDataYoung2 = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "F" && fwCheck1 < 2  && fwCheck1 > 0 && player.age < 24){
        fwCheck1++;
        return (
          <VStack key={player.name}>
                    <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
          <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "F" && player.age < 24){
          fwCheck1++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })

    const forwardDataYoung3 = dataRating?.map((player,index) => {
      const dataRatingYoung  = convertedIndex ?  convertNested(player,convertedIndex): null
      if(player.position === "F" && fwCheck < 1  && fwCheck > -1 && player.age < 24){
        fwCheck++;
        return (
          <VStack key={player.name}>
                    <Center>
            <Image alt={"playerPhoto"} src={player.has_photo ? player.photo : "http://cdn.onlinewebfonts.com/svg/img_76927.png"} borderRadius='full' boxSize='50px'/>
        </Center>
          <Center>
          <Tr key={player.name} >
            <Td><Link href={`/player_profile/${player.slug}`}>{player.name}</Link></Td>
          </Tr>
          </Center>
          <Center>
              {dataRatingYoung?.toFixed(2)}
            </Center>

          </VStack>
        )
      }else{
        if(player.position === "F" && player.age < 24){
          fwCheck++;
        }
        return(<Tr key={player.name}></Tr>)
      }

    })






























  if(title==="rating"){

  

  return (
    <Flex>
      <HStack w='688px'>
        {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
      <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
 
        backgroundSize='1288px'
        backgroundRepeat="no-repeat"
        backgroundPosition= "top"

        h='746px' flex='1'> 
        
        {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
        
        <Center marginTop='5px' fontSize='20px'>
          <Player position='F' myData={forwardData}></Player>


          
        </Center>

        <Center  fontSize='20px'>
         
          <Player position='F' myData={forwardData2}></Player>

          
          <VStack  marginX='60px'>
            <Player position='M' myData={midfieldData3}></Player>
          </VStack>

          <Player position='F' myData={forwardData3}></Player>

          
        </Center>

        <Center  fontSize='20px'>
          <VStack marginRight='30px'>
            <Player position='M' myData={midfieldData2}></Player>
          </VStack>  

          <VStack  marginLeft='30px'>
            <Player position='M' myData={midfieldData}></Player>
          </VStack>


        </Center>

        <Center marginTop='18px' fontSize='20px'>
          <VStack >
            <Player position='D' myData={defenceData}></Player>
          </VStack>  

          <VStack  marginX='10px'>
            <Player position='D' myData={defenceData2}></Player>
          </VStack>

          <VStack  marginX='10px'>
            <Player position='D' myData={defenceData3}></Player>
          </VStack>  

          <VStack >
            <Player position='D' myData={defenceData4}></Player>
          </VStack>

        </Center>

        <Center fontSize='20px'>
          
          <Player position='G' myData={keeperData}></Player>
        
        </Center>

        {/* id = 0 buraya kadar oyuncu yerleri */ }
      </Box>
      </HStack>
    </Flex>
  );

  }else if(title==="aged"){

  

    return (
      <Flex>
        <HStack w='688px'>
          {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
        <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
          backgroundSize='1288px'
          backgroundPosition= "top"
          backgroundRepeat="no-repeat"
          h='746px' flex='1'> 
          
          {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
          
          <Center marginTop='5px' fontSize='20px'>
            <Player position='F' myData={forwardDataAge}></Player>
  
  
          </Center>
  
          <Center fontSize='20px'>
           
            <Player position='F' myData={forwardDataAge2}></Player>
  
            
            <VStack marginX='60px'>
              <Player position='M' myData={midfieldDataAge3}></Player>
            </VStack>
  
            <Player position='F' myData={forwardDataAge3}></Player>
  
            
          </Center>
  
          <Center fontSize='20px'>
            <VStack  marginRight='30px'>
              <Player position='M' myData={midfieldDataAge2}></Player>
            </VStack>  
  
            <VStack marginLeft='30px'>
              <Player position='M' myData={midfieldDataAge}></Player>
            </VStack>
  
  
          </Center>
  
          <Center marginTop='18px' fontSize='20px'>
            <VStack >
              <Player position='D' myData={defenceDataAge1}></Player>
            </VStack>  
  
            <VStack marginX='10px'>
              <Player position='D' myData={defenceDataAge2}></Player>
            </VStack>
  
            <VStack marginX='10px'>
              <Player position='D' myData={defenceDataAge3}></Player>
            </VStack>  
  
            <VStack >
              <Player position='D' myData={defenceDataAge4}></Player>
            </VStack>
  
          </Center>
  
          <Center fontSize='20px'>
            
            <Player position='G' myData={keeperDataAge}></Player>
          
          </Center>
  
          {/* id = 0 buraya kadar oyuncu yerleri */ }
        </Box>
        </HStack>
      </Flex>
    );
  
    }else if(title==="young"){

  

      return (
        <Flex>
          <HStack w='688px'>
            {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
            <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg'  
            backgroundSize='1288px'
            backgroundRepeat="no-repeat"
          backgroundPosition= "top"

            h='746px' flex='1'> 
            
            {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
            
            <Center marginTop='5px' fontSize='20px'>
              <Player position='F' myData={forwardDataYoung}></Player>
    
    
              
            </Center>
    
            <Center fontSize='20px'>
             
              <Player position='F' myData={forwardDataYoung2}></Player>
    
              
              <VStack  marginX='60px'>
                <Player position='M' myData={midfieldDataYoung3}></Player>
              </VStack>
    
              <Player position='F' myData={forwardDataYoung3}></Player>
    
              
            </Center>
    
            <Center fontSize='20px'>
              <VStack marginRight='30px'>
                <Player position='M' myData={midfieldDataYoung2}></Player>
              </VStack>  
    
              <VStack  marginLeft='30px'>
                <Player position='M' myData={midfieldDataYoung}></Player>
              </VStack>
    
    
            </Center>
    
            <Center  marginTop='18px' fontSize='20px'>
              <VStack >
                <Player position='D' myData={defenceDataYoung}></Player>
              </VStack>  
    
              <VStack  marginX='10px'>
                <Player position='D' myData={defenceDataYoung2}></Player>
              </VStack>
    
              <VStack  marginX='10px'>
                <Player position='D' myData={defenceDataYoung3}></Player>
              </VStack>  
    
              <VStack>
                <Player position='D' myData={defenceDataYoung4}></Player>
              </VStack>
    
            </Center>
    
            <Center fontSize='20px'>
              
              <Player position='G' myData={keeperDataYoung}></Player>
            
            </Center>
    
            {/* id = 0 buraya kadar oyuncu yerleri */ }
          </Box>
          </HStack>
        </Flex>
      );
    
      }
    
    else{
    return (
      <Flex>
        <HStack w='688px'>
          {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
        <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
          backgroundSize='1288px'
          backgroundRepeat="no-repeat"
          backgroundPosition= "top"

          h='746px' flex='1'> 
          
          {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
          
          <Center marginTop='5px' fontSize='20px'>
            <Player position='F' myData={forwardDataYellow}></Player>
  
  
            
          </Center>
  
          <Center fontSize='20px'>
           
            <Player position='F' myData={forwardDataYellow2}></Player>
  
            
            <VStack  marginX='60px'>
              <Player position='M' myData={midfieldDataYellow3}></Player>
            </VStack>
  
            <Player position='F' myData={forwardDataYellow3}></Player>
  
            
          </Center>
  
          <Center fontSize='20px'>
            <VStack  marginRight='30px'>
              <Player position='M' myData={midfieldDataYellow2}></Player>
            </VStack>  
  
            <VStack  marginLeft='30px'>
              <Player position='M' myData={midfieldDataYellow}></Player>
            </VStack>
  
  
          </Center>
  
          <Center marginTop='18px' fontSize='20px'>
            <VStack >
              <Player position='D' myData={defenceDataYellow1}></Player>
            </VStack>  
  
            <VStack  marginX='10px'>
              <Player position='D' myData={defenceDataYellow2}></Player>
            </VStack>
  
            <VStack  marginX='10px'>
              <Player position='D' myData={defenceDataYellow3}></Player>
            </VStack>  
  
            <VStack >
              <Player position='D' myData={defenceDataYellow4}></Player>
            </VStack>
  
          </Center>
  
          <Center fontSize='20px'>
            
            <Player position='G' myData={keeperDataYellow}></Player>
          
          </Center>
  
          {/* id = 0 buraya kadar oyuncu yerleri */ }
        </Box>
        </HStack>
      </Flex>
    );
  }

  function techStackButton(text: string) {
    return <Button rounded={"base"}>{text}</Button>;
  }
}
