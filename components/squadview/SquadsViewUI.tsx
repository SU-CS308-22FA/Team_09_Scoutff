import {


  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  LinkBox,

  Spinner,

  Textarea,

  useToast, VStack,

} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import axios from "axios";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { SearchIcon } from "@chakra-ui/icons";
import { PlayerInterface } from "../../interfaces/PlayerInterface";
import useDebounce from "../../hook/useDebounce";


type Props = {
    squad: {
      comment: string;
      team: Array<PlayerInterface |  {
        footballPosition: string;
      }>;
      } | null,
      whichExpert: string;


  
}


type FormValues = {
  members : Array<{
    _id ?: string;
    name ?: string;
    photo ?: string;
    slug ?: string;
    footballPosition : string;
    team? : {
      name : string;
      logo : string;
    }
  }>;
  comment : string;
  week : number;
  focus : boolean;
}




export default function SquadsUItwo({squad, whichExpert} :  Props) {  

const convertToQuery = (graphqlQuery: string) => gql`query {playerSearch(input : {limit:5,path:"name",query:"${graphqlQuery}"}) { _id name slug photo team{name logo} }}`;





const {

  handleSubmit,
  control,
  register,
  watch,
  formState: { errors, isSubmitting },
} = useForm<FormValues>({
  defaultValues: {
    members: squad?.team || [],
    comment: squad?.comment || "",
    week: 1,
  },
})


const { fields, append, prepend, remove, swap, move, insert,update } = useFieldArray({
  control, // control props comes from useForm (optional: if you are using FormContext)
  name: "members", // unique name for your Field Array
});





  const toast = useToast()


  const createExpertsquad : SubmitHandler<FormValues>  = async (data) => {

    const {members, comment, week} = data;

    console.log(members);

    const indexToFootballPosition11Players = ["GK","LB","LCB","RCB","RB","LCM","RCM","CAM","LW","RW","ST"] as const;

    
    const orderedMembers = members.sort((a,b) => {
      const indexA = indexToFootballPosition11Players.indexOf(a.footballPosition as any);
      const indexB = indexToFootballPosition11Players.indexOf(b.footballPosition as any);
      return indexA - indexB;
    })

    



    const res = await axios.post(`/api/expert/${whichExpert}/squads`,{
      members : orderedMembers.map((member) => member._id),
      comment,
      week
    })
    

    





    
    }






  

  
  const playerStack =  fields.reduce((acc,item,index) => {
    const temp =  (
      <VStack key={item._id}>
      
      
      <Image boxSize='35px' src={item.photo} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
      <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${item.slug}`}>{item.name}</Link>
        
                 
      
    </VStack> 
    );

    acc.set(item.footballPosition,temp);

    return acc;

  },new Map<string,JSX.Element>())
      
    


  return (
    <form onSubmit={handleSubmit(createExpertsquad)}>

    <Flex>
      <VStack>
      <Input fontFamily = "sans-serif" fontSize="14px" border={0} readOnly={true} unselectable="on" {...register("comment")}  placeholder={"Enter a comment"} _placeholder={{ opacity: 1, color: 'grey.700' }} size='lg' />
      <HStack w='688px'>
        {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
      <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
 
        backgroundSize='1288px'
        backgroundRepeat="no-repeat"
        backgroundPosition= "top"

        h='746px' flex='1'> 

          <Center marginTop='40px' fontSize='20px'>
            {playerStack.get("ST")}
          </Center>

          <Center marginTop='40px' fontSize='20px'>

            {playerStack.get("LW")}
            
            <VStack marginX = '100px'>
              {playerStack.get("CAM")}
            </VStack>
            

            {playerStack.get("RW")}
          </Center>

          <Center marginTop='40px' fontSize='20px'>
            <VStack marginRight='50px'>
              {playerStack.get("LCM")}
            </VStack>
            <VStack marginLeft='50px'>
              {playerStack.get("RCM")}
            </VStack>
          </Center>

          <Center marginTop='40px' fontSize='20px'>
            <VStack>
              {playerStack.get("LB")}
            </VStack>
            <VStack marginX = '40px'>
              {playerStack.get("LCB")}
            </VStack>
            <VStack marginX = '40px'>
              {playerStack.get("RCB")}
            </VStack>
            <VStack>
              {playerStack.get("RB")}
            </VStack>
          </Center>

          <Center marginTop='40px' fontSize='20px'>
            {playerStack.get("GK")}
          </Center>



        </Box>
        
      </HStack>



      </VStack>


    </Flex>
    
    </form>

  );

}
