
import {
    Box,
    Center,
    Flex,
    Image,
    Text,
    Heading,
    VStack,
    HStack,
    Container,
    Select,
  } from "@chakra-ui/react";
import axios from "axios";

import {InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import RealShowcaseUI from "../components/showcase/RealShowcaseUI";
import ShowcaseUI from "../components/showcase/ShowcaseUI";
import { PlayerInterface } from "../interfaces/PlayerInterface";
import { getAllSquadOfExpert, SingleMatchRecord, WeeklyMatchRecord } from "../lib/api/expert";
import dbConnect from "../lib/mongoose";
import Expert, { IExpert } from "../models/Expert";

/**
 * Return data for each query with the 
 * corresponding types using graphql.
 * @param id the unique number which will identify expert
 * @returns the graphql query data result
 */




  
const ExpertPage= ({experts}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter();

    const { load } = router.query;



    if (!experts || experts.length === 0) {
        return <div>
            <Center>
                <Text fontSize="xl" color={"blackAlpha.600"}>{"No expert found"} </Text>
            </Center>
        </div>
    }
   



    const [expert, setExpert] = useState(experts.find(expert => expert._id === load) ?? experts[0]);


    const [squads, setSquads] = useState<WeeklyMatchRecord | null>(null);

    const [squad, setSquad] = useState<SingleMatchRecord| null>(null);

    console.log(squad, "squad");
    


    useEffect(() => { 
        const loadExpertSquad = async () => {
            try{
            console.log(expert._id, "expert id");
            const result = await axios.get<WeeklyMatchRecord>(`/api/expert/${expert._id}/squads`);

           
            setSquads(result.data);
            }
        catch(err)
        {
            setSquads(null);

        }
        }
        loadExpertSquad();

        
    }, [expert]);
  
    useEffect(() => {
       if (squads) {
            //get first key of map

            const result = squads[Object.keys(squads)[0]];


            console.log(result, "result");
        
            

            setSquad(result ?? null);

           
       }
       else
       {
        console.log("no squad");
            setSquad(null);
       }

    }, [squads]);


    const handleExpertChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExpert(experts[parseInt(event.target.value)]);
    }
    const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (squads){
        console.log(event.target.value);
        setSquad(squads[event.target.value]);
      }
    }



  
  return (
    <Container maxW="container.xl" p={0}>
    <Flex h="110vh" w="fit-content" py={15}>
      <><VStack w="500px" h="full" p={10} spacing={20} alignItems="start">
        <HStack>
        <Image alt={"expertImage"} src={expert.image ?? "https://www.macfit.com.tr/wp-content/uploads/2022/09/PHOTO-2021-12-16-17-56-13.png"} borderRadius='full' boxSize='200px'/>

        
        <VStack spacing={5} alignItems="center">
          
        <Heading size="md" width="max-content" fontWeight="bold" ml="4" color={"gray.800"}>
        {expert.name}
        </Heading>
        <Text fontSize="md" color={"blackAlpha.600"}>{"Commentator"} </Text>

        </VStack>
        </HStack>
        
        <Text textAlign={"center"} fontSize="md" color={"blackAlpha.700"}>{expert.bio ?? ""} </Text>

       
      </VStack>

      <VStack w="full" h="full" p={10} spacing={10}>

        
      <Box
            height={'1200px'}
            alignItems={"flex-end"}
            width={"800px"}
            overflow={'hidden'}>
            <VStack spacing={5} alignItems={"left"}>
            
<HStack>
            <Select 
                variant="filled"
                onChange={handleExpertChange}
                defaultValue={experts.indexOf(expert)}
                width={"200px"}>
                {experts.map((expert,index) => (
                    <option key={index} value={index}>{expert.name}</option>
                ))}

            </Select>   
            <Select 
                variant="filled"
                onChange={handleWeekChange}
                width={"200px"}>
                {Object.keys(squads??{}).map((obj,index) => (
                    <option key={index} value={obj}>{obj.charAt(0).toUpperCase() + obj.slice(1, 4) + ' ' + obj.slice(4)}</option>
                ))}

            </Select>   
            </HStack>


            {squad && (
            <Box w={"fit-content"} alignItems={"center"}>

                <RealShowcaseUI players={squad.players}  name={expert.name}  comment={squad.comment}/>
                    
            </Box>
            )}
            
        </VStack>
    </Box>



    </VStack>

    </>
    </Flex>
    </Container>

    );

};

export default ExpertPage;




 
 
  
export const getServerSideProps = async () => {
    await dbConnect();

    const experts = await Expert.find({}).select("image  name   bio   _id").lean();

   

    //convert id to string
    experts.forEach((expert) => {
        expert._id = expert._id.toString();
    });






    
    return {
      props: {
        experts : experts,
      },
    };

};
