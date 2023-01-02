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

  LinkBox,

  Spinner,

  useToast, VStack,

} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import useDebounce from "../../../hook/useDebounce";
import { PlayerInterface } from "../../../interfaces/PlayerInterface";
import axios from "axios";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { SearchIcon } from "@chakra-ui/icons";


type Props = {
    squad: {
      comment: string;
      team: Array<PlayerInterface>;
      } | null,
      whichExpert: string;


  
}


type FormValues = {
  members : Array<{
    _id : string;
    name : string;
    photo ?: string;
    slug : string;
    team? : {
      name : string;
      logo : string;
    }
  }>;
  comment : string;
  week : number;
  focus : boolean;
}




export default function SquadsUI({squad, whichExpert} :  Props) {  

const convertToQuery = (graphqlQuery: string) => gql`query {playerSearch(input : {limit:5,path:"name",query:"${graphqlQuery}"}) { name slug photo team{name logo} }}`;



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


    const res = await axios.post(`/api/expert/${whichExpert}/squads`,{
      members : members.map((member) => member._id),
      comment,
      week
    })
    

    

    toast({
      title: "Success",
      description: "Squad has been inserted",
      status: "success",
      duration: 2000,
      isClosable: true,
    })



    
    }




    const [search, setSearch] = useState<string | null>(null);
    const debouncedSearch = useDebounce(search, 500);
    const [foundPlayers,setFoundPlayers] = useState<Array<PlayerInterface>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const client = useApolloClient();
    const [focus,setFocus] = useState<number>(-1);

    useEffect(() => {
      // search the api
      async function fetchData() {
        setLoading(true);  
        setFoundPlayers([]);
        const datas = await client.query({
          query: convertToQuery(debouncedSearch),
        }) 
        console.log(datas);
        setFoundPlayers(datas.data.playerSearch);
        setLoading(false);
      }
      if (debouncedSearch) fetchData();
    }, [debouncedSearch,client]);

  
  const playerStack =  fields.map((item, index) => {

    

          return (
            <VStack key={item._id}>
            
            
            <Image boxSize='35px' src={item.photo} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${item.slug}`}>{item.name}</Link>
              <div onFocus={ () => setFocus(index)} onBlur={() => setTimeout(() => setFocus(-1),100)}>

                <HStack zIndex={200}  >
                  <InputGroup>
                    <InputLeftElement>
                    <SearchIcon/>
                    </InputLeftElement>
                    <Input
                        placeholder="Search" 
                      _placeholder={{ color: 'blue.100' }}
                      type= "search"
                      colorScheme="teal" 
                      onChange={(e) => setSearch(e.target.value)}
                      />
                  </InputGroup>

                  {loading && focus === index && <Spinner />}


              </HStack>

              {focus === index && 

              <div style={{position:"absolute"}}>
                {foundPlayers.map((player) => {
                      return (
                  
                        <LinkBox zIndex={900} key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'gray.200',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button zIndex={600} onClick={()=> {
                              update(index, {
                                _id: player._id,
                                name: player.name,
                                photo: player.photo,
                                slug: player.slug,
                              })
                            }}
                            >
                              {player.name}
                            </Button>
                  
    
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
              }
                       
              </div>
            
          </VStack> 
          );
        })
      
    


  return (
    <form onSubmit={handleSubmit(createExpertsquad)}>

    <Flex>
      <VStack>
      <Input {...register("comment")}  placeholder={"Enter a comment"} _placeholder={{ opacity: 1, color: 'grey.700' }} size='lg' />
      <HStack w='688px'>
        {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
      <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
 
        backgroundSize='1288px'
        backgroundRepeat="no-repeat"
        backgroundPosition= "top"

        h='746px' flex='1'> 

          <Center marginTop='10px' fontSize='20px'>
            {playerStack.at(10)}
          </Center>

          <Center marginTop='1px' fontSize='20px'>

            {playerStack.at(9)}
            
            <VStack marginX = '100px'>
              {playerStack.at(8)}
            </VStack>
            

            {playerStack.at(7)}
          </Center>

          <Center marginTop='1px' fontSize='20px'>
            <VStack marginRight='50px'>
              {playerStack.at(6)}
            </VStack>
            <VStack marginLeft='50px'>
              {playerStack.at(5)}
            </VStack>
          </Center>

          <Center marginTop='1px' fontSize='20px'>
            <VStack>
              {playerStack.at(4)}
            </VStack>
            <VStack marginX = '40px'>
              {playerStack.at(3)}
            </VStack>
            <VStack marginX = '40px'>
              {playerStack.at(2)}
            </VStack>
            <VStack>
              {playerStack.at(1)}
            </VStack>
          </Center>

          <Center marginTop='1px' fontSize='20px'>
            {playerStack.at(0)}
          </Center>



        </Box>
        
      </HStack>

      </VStack>


    </Flex>
    
    </form>

  );

}
