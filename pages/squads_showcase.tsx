import dbConnect from "../lib/mongoose";
import { InferGetServerSidePropsType } from "next";

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
    Container,
    IconButton,
  } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from 'react-slick';
import React, { useEffect, useState } from "react";
import { getSquadOfWeek, SingleMatchRecord, WeeklyMatchRecord } from "../lib/api/expert";
import Expert from "../models/Expert";
import SquadsCompIndexTwo from "../components/squadview";
import axios from "axios";
import RealShowcaseUI from "../components/showcase/RealShowcaseUI";

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

  
  const SquadsShowcase= ({experts}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // As we have used custom buttons, we need a reference variable to
        // change the state
        const [slider, setSlider] = React.useState<Slider | null>(null);
      
        // These are the breakpoints which changes the position of the
        // buttons as the screen size changes
        const top = useBreakpointValue({ base: '90%', md: '50%' });
        const side = useBreakpointValue({ base: '50%', md: '40px' });

        console.log(experts);

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


      
    return (
        <Center>
        <Box
        position={"relative"}
        height={'1000px'}
        width={"900px"}
        overflow={'hidden'}
        >
        {/* CSS files for react-slick */}
        <>
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

        {experts.map((expert, index) => {
          return (
            <Box
              height={'full'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"              
              >
                <RealShowcaseUI
          players={expert.squad?.team??[]}
          name={expert.name}
          comment={expert.squad?.comment??""}/>  
              {/* This is the block you need to change, to customize the caption */}
                          
            </Box>
          );
  })}
        </Slider>

   

</>
      </Box>
      
      </Center>
    );
  
   
  };


  export default SquadsShowcase;

  export const getServerSideProps = async () => {
    await dbConnect();

    const experts = await Expert.find({}).select("image  name   _id").lean();

   

    //convert id to string
    experts.forEach((expert) => {
        expert._id = expert._id.toString();
    });

    const expertsWithTeams = await Promise.all(experts.map(async (expert) => {
      const squad = await getSquadOfWeek({expert: expert._id,weekNumber: 1})
      squad?.team.forEach((team) => {
        if (team._id)
          team._id = team._id.toString();
      });



      return {...expert,_id : expert._id.toString(), squad: squad};
      
    }));
    

    console.log(expertsWithTeams)

    
    return {
      props: {
        experts : expertsWithTeams,
      },
    };

};