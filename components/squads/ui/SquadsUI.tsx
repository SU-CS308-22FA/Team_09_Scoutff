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
  useToast,
  Avatar,
  InputGroup,
  InputLeftElement,
  LinkBox,
  LinkOverlay,
  Spinner,
  Link
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ExpertSquad from "../../../models/Expertsquads";
import dbConnect from "../../../lib/mongoose";
import { InferGetServerSidePropsType } from "next";
import { gql, useApolloClient } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import useDebounce from "../../../hook/useDebounce";

function Player(str: { position: string | undefined; }){
  return(<VStack>
    <Text fontSize='30px'>👕</Text>
    <Input  placeholder={str.position} _placeholder={{ opacity: 1, color: 'blue.700' }} size='sm' w='114px' />
    
  </VStack> )
}

interface PlayerInterface {
  name: string;
  slug: string;
  photo: string;
  team:{
      name: string;
      logo: string;
  };
}





















export default function SquadsUI({data, whichExpert} :  any) {  

const convertToQuery = (graphqlQuery: string) => gql`query {playerSearch(input : {limit:5,path:"name",query:"${graphqlQuery}"}) { name slug photo team{name logo} }}`;
const [players, setPlayer] = useState<PlayerInterface[]>([]);
const [search, setSearch] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const client = useApolloClient();


const debouncedSearch = useDebounce(search, 500);

const [focusedSearch, setFocusedSearch] = useState(false);


useEffect(() => {
    // search the api

    async function fetchData() {
      setLoading(true);
      
      setPlayer([]);

      const datas = await client.query({
        query: convertToQuery(debouncedSearch),


      })
        
      console.log(datas);

      setPlayer(datas.data.playerSearch);
      setLoading(false);
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch,client]);































  
  const [gkslug, setGkSlug] = useState('');
  const [gkname, setGkName] = useState('');
  const [gkphoto, setGkPhoto] = useState('');

  const [lbslug, setLbSlug] = useState('');
  const [lbname, setLbName] = useState('');
  const [lbphoto, setLbPhoto] = useState('');

  const [lcbslug, setLcbSlug] = useState('');
  const [lcbname, setLcbName] = useState('');
  const [lcbphoto, setLcbPhoto] = useState('');
 

  const [rcbname, setRcbName] = useState('');
  const [rcbslug, setRcbSlug] = useState('');
  const [rcbphoto, setRcbPhoto] = useState('');

  const [rbslug, setRbSlug] = useState('');
  const [rbname, setRbName] = useState('');
  const [rbphoto, setRbPhoto] = useState('');

  const [lcmslug, setLcmSlug] = useState('');
  const [lcmname, setLcmName] = useState('');
  const [lcmphoto, setLcmPhoto] = useState('');

  const [rcmslug, setRcmSlug] = useState('');
  const [rcmname, setRcmName] = useState('');
  const [rcmphoto, setRcmPhoto] = useState('');

  const [camslug, setCamSlug] = useState('');
  const [camname, setCamName] = useState('');
  const [camphoto, setCamPhoto] = useState('');


  const [lwslug, setLwSlug] = useState('');
  const [lwname, setLwName] = useState('');
  const [lwphoto, setLwPhoto] = useState('');

  const [rwslug, setRwSlug] = useState('');
  const [rwname, setRwName] = useState('');
  const [rwphoto, setRwPhoto] = useState('');

  const [stslug, setStSlug] = useState('');
  const [stname, setStName] = useState('');
  const [stphoto, setStPhoto] = useState('');

  const [commenter, setValue12] = useState('');



  const toast = useToast()


  const createExpertsquad = async (expertWhich: any) => {
    console.log(expertWhich);
    const namer : String = `` + expertWhich;
    let realName;
    if(namer === `expert1`){
      realName = `Rıdvan Dilmen`
    }else if(namer === `expert2`){
      realName = `Sinan Engine`
    }else if(namer === `expert3`){
      realName = `Ali Ece`
    }else if(namer === `expert4`){
      realName = `Erman Toroğlu`
    }else{
      realName = `There is a problem`
    }
    const res  = await fetch('/api/expertsquad', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name: realName,
        comment: commenter,
        gk: gkname,
        gkslug: gkslug,
        gkphoto: gkphoto,

        lb: lbname,
        lbslug: lbslug,
        lbphoto: lbphoto,

        lcb: lcbname,
        lcbslug: lcbslug,
        lcbphoto: lcbphoto,

        rcb: rcbname,
        rcbslug: rcbslug,
        rcbphoto: rcbphoto,

        rb: rbname,
        rbslug: rbslug,
        rbphoto: rbphoto,

        lcm: lcmname,
        lcmslug: lcmslug,
        lcmphoto: lcmphoto,

        rcm: rcmname,
        rcmslug: rcmslug,
        rcmphoto: rcmphoto,

        cam: camname,
        camslug: camslug,
        camphoto: camphoto,
        
        lw: lwname,
        lwslug: lwslug,
        lwphoto: lwphoto,

        rw: rwname,
        rwslug: rwslug,
        rwphoto: rwphoto,

        st: stname,
        stslug: stslug,
        stphoto: stphoto,

        num: namer,
      }),
    
    });

    const data = await res.json();

    toast({
      title: "Success",
      description: "Squad has been inserted",
      status: "success",
      duration: 2000,
      isClosable: true,
    })

    console.log(data);
  }

  


  return (
    <Flex>
      <VStack>
      <Input onChange={({target})=> setValue12(target?.value)} value={commenter} placeholder={data?.comment} _placeholder={{ opacity: 1, color: 'grey.700' }} size='lg' />
      <HStack w='688px'>
        {/*https://images.saymedia-content.com/.image/t_share/MTc0MjQ3MjE5MTQxMDI3MzI0/positions-in-soccer-and-their-roles.png*/}
      <Box backgroundImage='https://pbs.twimg.com/media/DG9CaHdXYAEmLw5.jpg' 
 
        backgroundSize='1288px'
        backgroundRepeat="no-repeat"
        backgroundPosition= "top"

        h='746px' flex='1'> 
        
        {/* id = 0 buradan asaya kadar oyuncu yerleri */ }
        
        <Center marginTop='10px' fontSize='20px'>
          <VStack>
            
            <Image boxSize='40px' src={data?.stphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.stslug}`}>{data?.st}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setStName(player.name); setStPhoto(player.photo); setStSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
            
          </VStack> 


          
        </Center>

        <Center marginTop='1px' fontSize='20px'>
         
          <VStack>
          <Image boxSize='40px' src={data?.lwphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lwslug}`}>{data?.lw}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setLwName(player.name); setLwPhoto(player.photo); setLwSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
          </VStack> 

          
          <VStack  marginX='100px'>
            <VStack>
              
              <Image boxSize='40px' src={data?.camphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.camslug}`}>{data?.cam}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setCamName(player.name); setCamPhoto(player.photo); setCamSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
            </VStack> 
          </VStack>

          <VStack>
            
            <Image boxSize='40px' src={data?.rwphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rwslug}`}>{data?.rw}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setRwName(player.name); setRwPhoto(player.photo); setRwSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
          </VStack> 

          
        </Center>

        <Center marginTop='1px' fontSize='20px'>
          <VStack marginRight='50px'>
            <VStack>
              <Image boxSize='40px' src={data?.lcmphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lcmslug}`}>{data?.lcm}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setLcmName(player.name); setLcmPhoto(player.photo); setLcmSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
            </VStack> 
          </VStack>  

          <VStack  marginLeft='50px'>
            <VStack>
              
              <Image boxSize='40px' src={data?.rcmphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rcmslug}`}>{data?.rcm}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setRcmName(player.name); setRcmPhoto(player.photo); setRcmSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
            </VStack> 
          </VStack>


        </Center>

        <Center marginTop='1px' fontSize='20px'>
          <VStack >
            <VStack>
              


















              <Image boxSize='40px' src={data?.lbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lbslug}`}>{data?.lb}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setLbName(player.name); setLbPhoto(player.photo); setLbSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>


              












            </VStack> 
          </VStack>  

          <VStack  marginX='40px'>
            <VStack>
              







              
              
              
              
              <Image boxSize='40px' src={data?.lcbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.lcbslug}`}>{data?.lcb}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setLcbName(player.name); setLcbPhoto(player.photo); setLcbSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>





















            </VStack> 
          </VStack>

          <VStack  marginX='40px'>
            <VStack>








              <Image boxSize='40px' src={data?.rcbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rcbslug}`}>{data?.rcb}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setRcbName(player.name); setRcbPhoto(player.photo); setRcbSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
            
            
            
            
            
            
            
            </VStack> 
          </VStack>  

          <VStack >
            <VStack>
              





              <Image boxSize='40px' src={data?.rbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.rbslug}`}>{data?.rb}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setRbName(player.name); setRbPhoto(player.photo); setRbSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>
            
            
            
            
            
            
            
            </VStack> 
          </VStack>

        </Center>

        <Center marginTop='1px' fontSize='20px'>
          
            <VStack>





















              <Image boxSize='40px' src={data?.gkphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='15px' href={`/player_profile/${data?.gkslug}`}>{data?.gk}</Link>
              
              <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setTimeout(() => setFocusedSearch(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                  <Input placeholder="Search"
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch(e.target.value)}
                />
                  </InputGroup>

              {loading && <Spinner />}
              </HStack>


              {focusedSearch &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox key={player.slug}
                      
                        backgroundColor="Background"
                        width= "250px"
                        maxHeight={70}
                        z-index= "30"
                              rounded="lg"
                              _hover={{
                                color: "gray",
                                transform: 'scale(1.05)',
                                transition: 'all 0.5s ease',
                                bg: 'rgba(0,0,0,0.1)',
                              }}
                              as="article" borderWidth='1px' >
                          
                        <Flex key={player.slug} p={4} >
                          
                            <Avatar
                              src={player.photo}
                              width="40px"
                              height="40px"
                            />
                          
                          <Flex direction="column" ml={4}>
                            <Button onClick={()=> {setGkName(player.name); setGkPhoto(player.photo); setGkSlug(player.slug);}} size='sm'>
                              {player.name}
                            </Button>
                  
                            <Text fontSize={"x-small"}
                            >{player.team.name}</Text>
                          </Flex>
                        </Flex>
                        </LinkBox>
                      );

                })}
              
              </div>
                

              }
              
              </div>





























              
            </VStack> 
        
        </Center>

        {/* id = 0 buraya kadar oyuncu yerleri */ }
      </Box>
      
      </HStack>

      <HStack>
        <Button onClick={() => createExpertsquad(whichExpert)}>Save</Button>
      </HStack>
      </VStack>
    </Flex>
    
  );


}



