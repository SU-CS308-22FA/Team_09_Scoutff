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
  Link,
  Textarea
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
const [loading1, setLoading1] = useState(false);
const [loading2, setLoading2] = useState(false);
const [loading3, setLoading3] = useState(false);
const [loading4, setLoading4] = useState(false);
const [loading5, setLoading5] = useState(false);
const [loading6, setLoading6] = useState(false);
const [loading7, setLoading7] = useState(false);
const [loading8, setLoading8] = useState(false);
const [loading9, setLoading9] = useState(false);
const [loading10, setLoading10] = useState(false);
const [loading11, setLoading11] = useState(false);


const client = useApolloClient();

const [search1, setSearch1] = useState<string | null>(null);
const debouncedSearch1 = useDebounce(search1, 500);
const [focusedSearch1, setFocusedSearch1] = useState(false);

useEffect(() => {
    // search the api
    async function fetchData() {
      setLoading1(true);  
      setPlayer([]);
      const datas = await client.query({
        query: convertToQuery(debouncedSearch1),
      }) 
      console.log(datas);
      setPlayer(datas.data.playerSearch);
      setLoading1(false);
    }
    if (debouncedSearch1) fetchData();
  }, [debouncedSearch1,client]);


const [search2, setSearch2] = useState<string | null>(null);
const debouncedSearch2 = useDebounce(search2, 500);
const [focusedSearch2, setFocusedSearch2] = useState(false);

useEffect(() => {
    // search the api
    async function fetchData() {
      setLoading2(true);  
      setPlayer([]);
      const datas = await client.query({
        query: convertToQuery(debouncedSearch2),
      }) 
      console.log(datas);
      setPlayer(datas.data.playerSearch);
      setLoading2(false);
    }
    if (debouncedSearch2) fetchData();
  }, [debouncedSearch2,client]);


  const [search3, setSearch3] = useState<string | null>(null);
  const debouncedSearch3 = useDebounce(search3, 500);
  const [focusedSearch3, setFocusedSearch3] = useState(false);
  
  useEffect(() => {
      // search the api
      async function fetchData() {
        setLoading3(true);  
        setPlayer([]);
        const datas = await client.query({
          query: convertToQuery(debouncedSearch3),
        }) 
        console.log(datas);
        setPlayer(datas.data.playerSearch);
        setLoading3(false);
      }
      if (debouncedSearch3) fetchData();
    }, [debouncedSearch3,client]);

    const [search4, setSearch4] = useState<string | null>(null);
    const debouncedSearch4 = useDebounce(search4, 500);
    const [focusedSearch4, setFocusedSearch4] = useState(false);
    
    useEffect(() => {
        // search the api
        async function fetchData() {
          setLoading4(true);  
          setPlayer([]);
          const datas = await client.query({
            query: convertToQuery(debouncedSearch4),
          }) 
          console.log(datas);
          setPlayer(datas.data.playerSearch);
          setLoading4(false);
        }
        if (debouncedSearch4) fetchData();
      }, [debouncedSearch4,client]);


      const [search5, setSearch5] = useState<string | null>(null);
      const debouncedSearch5 = useDebounce(search5, 500);
      const [focusedSearch5, setFocusedSearch5] = useState(false);
      
      useEffect(() => {
          // search the api
          async function fetchData() {
            setLoading5(true);  
            setPlayer([]);
            const datas = await client.query({
              query: convertToQuery(debouncedSearch5),
            }) 
            console.log(datas);
            setPlayer(datas.data.playerSearch);
            setLoading5(false);
          }
          if (debouncedSearch5) fetchData();
        }, [debouncedSearch5,client]);


        const [search6, setSearch6] = useState<string | null>(null);
        const debouncedSearch6 = useDebounce(search6, 500);
        const [focusedSearch6, setFocusedSearch6] = useState(false);
        
        useEffect(() => {
            // search the api
            async function fetchData() {
              setLoading6(true);  
              setPlayer([]);
              const datas = await client.query({
                query: convertToQuery(debouncedSearch6),
              }) 
              console.log(datas);
              setPlayer(datas.data.playerSearch);
              setLoading6(false);
            }
            if (debouncedSearch6) fetchData();
          }, [debouncedSearch6,client]);

          const [search7, setSearch7] = useState<string | null>(null);
          const debouncedSearch7 = useDebounce(search7, 500);
          const [focusedSearch7, setFocusedSearch7] = useState(false);
          
          useEffect(() => {
              // search the api
              async function fetchData() {
                setLoading7(true);  
                setPlayer([]);
                const datas = await client.query({
                  query: convertToQuery(debouncedSearch7),
                }) 
                console.log(datas);
                setPlayer(datas.data.playerSearch);
                setLoading7(false);
              }
              if (debouncedSearch7) fetchData();
            }, [debouncedSearch7,client]);


            const [search8, setSearch8] = useState<string | null>(null);
            const debouncedSearch8 = useDebounce(search8, 500);
            const [focusedSearch8, setFocusedSearch8] = useState(false);
            
            useEffect(() => {
                // search the api
                async function fetchData() {
                  setLoading8(true);  
                  setPlayer([]);
                  const datas = await client.query({
                    query: convertToQuery(debouncedSearch8),
                  }) 
                  console.log(datas);
                  setPlayer(datas.data.playerSearch);
                  setLoading8(false);
                }
                if (debouncedSearch8) fetchData();
              }, [debouncedSearch8,client]);

              const [search9, setSearch9] = useState<string | null>(null);
              const debouncedSearch9 = useDebounce(search9, 500);
              const [focusedSearch9, setFocusedSearch9] = useState(false);
              
              useEffect(() => {
                  // search the api
                  async function fetchData() {
                    setLoading9(true);  
                    setPlayer([]);
                    const datas = await client.query({
                      query: convertToQuery(debouncedSearch9),
                    }) 
                    console.log(datas);
                    setPlayer(datas.data.playerSearch);
                    setLoading9(false);
                  }
                  if (debouncedSearch9) fetchData();
                }, [debouncedSearch9,client]);

                const [search10, setSearch10] = useState<string | null>(null);
                const debouncedSearch10 = useDebounce(search10, 500);
                const [focusedSearch10, setFocusedSearch10] = useState(false);
                
                useEffect(() => {
                    // search the api
                    async function fetchData() {
                      setLoading10(true);  
                      setPlayer([]);
                      const datas = await client.query({
                        query: convertToQuery(debouncedSearch10),
                      }) 
                      console.log(datas);
                      setPlayer(datas.data.playerSearch);
                      setLoading10(false);
                    }
                    if (debouncedSearch10) fetchData();
                  }, [debouncedSearch10,client]);                


                  const [search11, setSearch11] = useState<string | null>(null);
                  const debouncedSearch11 = useDebounce(search11, 500);
                  const [focusedSearch11, setFocusedSearch11] = useState(false);
                  
                  useEffect(() => {
                      // search the api
                      async function fetchData() {
                        setLoading11(true);  
                        setPlayer([]);
                        const datas = await client.query({
                          query: convertToQuery(debouncedSearch11),
                        }) 
                        console.log(datas);
                        setPlayer(datas.data.playerSearch);
                        setLoading11(false);
                      }
                      if (debouncedSearch11) fetchData();
                    }, [debouncedSearch11,client]);

















  const [tempSt, setTempSt] = useState('');
  const [tempLw, setTempLw] = useState('');
  const [tempCam, setTempCam] = useState('');
  const [tempRw, setTempRw] = useState('');
  const [tempLcm, setTempLcm] = useState('');
  const [tempRcm, setTempRcm] = useState('');
  const [tempLb, setTempLb] = useState('');
  const [tempLcb, setTempLcb] = useState('');
  const [tempRcb, setTempRcb] = useState('');
  const [tempRb, setTempRb] = useState('');
  const [tempGk, setTempGk] = useState('');



  
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
            
            <Image boxSize='35px' src={data?.stphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.stslug}`}>{data?.st}</Link>
              <Text fontSize="10px">{tempSt}</Text>
              <div onFocus={ () => setFocusedSearch1(true)} onBlur={() => setTimeout(() => setFocusedSearch1(false),100)}>
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
                onChange={(e) => setSearch1(e.target.value)}
                />
                  </InputGroup>

              {loading1 && <Spinner />}
              </HStack>


              {focusedSearch1 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
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
                            <Button zIndex={600} onClick={()=> {setTempSt(`🔃 `+player.name);setStName(player.name); setStPhoto(player.photo); setStSlug(player.slug);}} size='sm'>
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
          <Image boxSize='35px' src={data?.lwphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.lwslug}`}>{data?.lw}</Link>
              <Text fontSize="10px">{tempLw}</Text>
              <div onFocus={ () => setFocusedSearch2(true)} onBlur={() => setTimeout(() => setFocusedSearch2(false),100)}>
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
                onChange={(e) => setSearch2(e.target.value)}
                />
                  </InputGroup>

              {loading2 && <Spinner />}
              </HStack>


              {focusedSearch2 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
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
                            <Button zIndex={600} onClick={()=> {setTempLw(`🔃 `+player.name);setLwName(player.name); setLwPhoto(player.photo); setLwSlug(player.slug);}} size='sm'>
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
              
              <Image boxSize='35px' src={data?.camphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.camslug}`}>{data?.cam}</Link>
              <Text fontSize="10px">{tempCam}</Text>
              <div onFocus={ () => setFocusedSearch3(true)} onBlur={() => setTimeout(() => setFocusedSearch3(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                
                colorScheme="teal" 
                onChange={(e) => setSearch3(e.target.value)}
                />
                  </InputGroup>

              {loading3 && <Spinner />}
              </HStack>


              {focusedSearch3 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempCam(`🔃 `+player.name);setCamName(player.name); setCamPhoto(player.photo); setCamSlug(player.slug);}} size='sm'>
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
            
            <Image boxSize='35px' src={data?.rwphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.rwslug}`}>{data?.rw}</Link>
              <Text fontSize="10px">{tempRw}</Text>
              <div onFocus={ () => setFocusedSearch4(true)} onBlur={() => setTimeout(() => setFocusedSearch4(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch4(e.target.value)}
                />
                  </InputGroup>

              {loading4 && <Spinner />}
              </HStack>


              {focusedSearch4 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempRw(`🔃 `+player.name);setRwName(player.name); setRwPhoto(player.photo); setRwSlug(player.slug);}} size='sm'>
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
              <Image boxSize='35px' src={data?.lcmphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.lcmslug}`}>{data?.lcm}</Link>
              <Text fontSize="10px">{tempLcm}</Text>
              <div onFocus={ () => setFocusedSearch5(true)} onBlur={() => setTimeout(() => setFocusedSearch5(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch5(e.target.value)}
                />
                  </InputGroup>

              {loading5 && <Spinner />}
              </HStack>


              {focusedSearch5 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempLcm(`🔃 `+player.name);setLcmName(player.name); setLcmPhoto(player.photo); setLcmSlug(player.slug);}} size='sm'>
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
              
              <Image boxSize='35px' src={data?.rcmphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.rcmslug}`}>{data?.rcm}</Link>
              <Text fontSize="10px">{tempRcm}</Text>
              <div onFocus={ () => setFocusedSearch6(true)} onBlur={() => setTimeout(() => setFocusedSearch6(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch6(e.target.value)}
                />
                  </InputGroup>

              {loading6 && <Spinner />}
              </HStack>


              {focusedSearch6 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempRcm(`🔃 `+player.name);setRcmName(player.name); setRcmPhoto(player.photo); setRcmSlug(player.slug);}} size='sm'>
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
              


















              <Image boxSize='35px' src={data?.lbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.lbslug}`}>{data?.lb}</Link>
              <Text fontSize="10px">{tempLb}</Text>
              <div onFocus={ () => setFocusedSearch7(true)} onBlur={() => setTimeout(() => setFocusedSearch7(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch7(e.target.value)}
                />
                  </InputGroup>

              {loading7 && <Spinner />}
              </HStack>


              {focusedSearch7 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempLb(`🔃 `+player.name);setLbName(player.name); setLbPhoto(player.photo); setLbSlug(player.slug);}} size='sm'>
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
              







              
              
              
              
              <Image boxSize='35px' src={data?.lcbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.lcbslug}`}>{data?.lcb}</Link>
              <Text fontSize="10px">{tempLcb}</Text>
              <div onFocus={ () => setFocusedSearch8(true)} onBlur={() => setTimeout(() => setFocusedSearch8(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch8(e.target.value)}
                />
                  </InputGroup>

              {loading8 && <Spinner />}
              </HStack>


              {focusedSearch8 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempLcb(`🔃 `+player.name);setLcbName(player.name); setLcbPhoto(player.photo); setLcbSlug(player.slug);}} size='sm'>
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








              <Image boxSize='35px' src={data?.rcbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.rcbslug}`}>{data?.rcb}</Link>
              <Text fontSize="10px">{tempRcb}</Text>
              <div onFocus={ () => setFocusedSearch9(true)} onBlur={() => setTimeout(() => setFocusedSearch9(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch9(e.target.value)}
                />
                  </InputGroup>

              {loading9 && <Spinner />}
              </HStack>


              {focusedSearch9 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempRcb(`🔃 `+player.name);setRcbName(player.name); setRcbPhoto(player.photo); setRcbSlug(player.slug);}} size='sm'>
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
              





              <Image boxSize='35px' src={data?.rbphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.rbslug}`}>{data?.rb}</Link>
              <Text fontSize="10px">{tempRb}</Text>
              <div onFocus={ () => setFocusedSearch10(true)} onBlur={() => setTimeout(() => setFocusedSearch10(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }}
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch10(e.target.value)}
                />
                  </InputGroup>

              {loading10 && <Spinner />}
              </HStack>


              {focusedSearch10 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempRb(`🔃 `+player.name);setRbName(player.name); setRbPhoto(player.photo); setRbSlug(player.slug);}} size='sm'>
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





















              <Image boxSize='35px' src={data?.gkphoto} fallbackSrc='http://cdn.onlinewebfonts.com/svg/img_76927.png' borderRadius='full'/>
              <Link fontWeight='bold' fontSize='14px' href={`/player_profile/${data?.gkslug}`}>{data?.gk}</Link>
              <Text fontSize="10px">{tempGk}</Text>
              
              <div onFocus={ () => setFocusedSearch11(true)} onBlur={() => setTimeout(() => setFocusedSearch11(false),100)}>
                <HStack zIndex={200}  >
                  <InputGroup>
                  <InputLeftElement>
                  <SearchIcon/>
                  </InputLeftElement>
                   <Input placeholder="Search" 
                _placeholder={{ color: 'blue.100' }} 
                type= "search"
                colorScheme="teal" 
                onChange={(e) => setSearch11(e.target.value)}
                />
                  </InputGroup>

              {loading11 && <Spinner />}
              </HStack>


              {focusedSearch11 &&  
              <div style={{position:"absolute"}}>
                {players.map((player) => {
                      return (
                  
                        <LinkBox  zIndex={900} key={player.slug}
                      
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
                            <Button zIndex={600} onClick={()=> {setTempGk(`🔃 `+player.name);setGkName(player.name); setGkPhoto(player.photo); setGkSlug(player.slug);}} size='sm'>
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



