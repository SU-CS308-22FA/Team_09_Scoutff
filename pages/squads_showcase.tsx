import dbConnect from "../lib/mongoose";
import Expert, { IExpert } from "../models/Expert";
import {InferGetServerSidePropsType } from "next";
import { Button,
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
    Container,
    IconButton,
  } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from 'react-slick';
import axios from "axios";
import React, { useEffect, useState } from "react";
import RealShowcaseUI from "../components/showcase/RealShowcaseUI";
import { getAllSquadOfExpert, SingleMatchRecord, WeeklyMatchRecord } from "../lib/api/expert";
import { PlayerInterface } from "../interfaces/PlayerInterface";


  // Settings for the slider
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,    
  };
  
  
  const SquadsShowcase = ({experts}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    
    if (!experts || experts.length === 0) {
      return <div>
          <Center>
              <Text fontSize="xl" color={"blackAlpha.600"}>{"No expert found"} </Text>
          </Center>
      </div>
  }
 

  const [expert, setExpert] = useState(experts[0]);


  const [squads, setSquads] = useState<WeeklyMatchRecord | null>(null);

  const [squad, setSquad] = useState<SingleMatchRecord| null>(null);

  console.log(squad, "squad");


  useEffect(() => { 
      const loadExpertSquad = async () => {
          try{
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
          console.log(Object.keys(squads));
          setSquad(result ?? null);

         
     }
     else
     {
          setSquad(null);
     }

  }, [squads]);


  const handleExpertChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setExpert(experts[parseInt(event.target.value)]);
  }

        // As we have used custom buttons, we need a reference variable to
        // change the state
        const [slider, setSlider] = React.useState<Slider | null>(null);
      
        // These are the breakpoints which changes the position of the
        // buttons as the screen size changes
        const top = useBreakpointValue({ base: '90%', md: '50%' });
        const side = useBreakpointValue({ base: '30%', md: '40px' });

  
    return (
        <Center>
        <Box
        position={"relative"}
        height={'900px'}
        width={"788px"}
        overflow={'hidden'}>
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}>
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}>
          <BiRightArrowAlt size="40px" />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>

        {experts.map((expert,index) => (
            <option key={index} value={index}>{expert.name}</option>
           ))}                            
           {squad && (

            <Box
              height={'full'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"              
              >

              {/* This is the block you need to change, to customize the caption */}
              <RealShowcaseUI players={squad.players}  name={expert.name}  comment={squad.comment}/>
              
            </Box>
            )}
          ))
        </Slider>
      </Box>
      </Center>
    );
  
    
  }

  export default SquadsShowcase;

  export const getServerSideProps = async () => {
    await dbConnect();

    const experts = await Expert.find({}).select("image  name   _id").lean();

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