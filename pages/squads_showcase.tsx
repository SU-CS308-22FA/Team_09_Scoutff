import dbConnect from "../lib/mongoose";
import { useSession, signIn, signOut } from "next-auth/react"
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import HomeCompIndex from "../components/home/ui";
import Navbar from "../components/layout/navbar/navbar";
import ExpertSquad from "../models/Expertsquads";
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
import ShowcaseUI from "../components/showcase/ShowcaseUI";
import React from "react";

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
  
  
  export default function SquadsShowcase({expertsquads} : any)  {  
    
    let dataMap = new Map();

    for (let i = 0; i < expertsquads.length; i++) {
        dataMap.set(expertsquads[i].num, expertsquads[i]);  
        }

    let myDataArray = [
        dataMap.get('expert1'),
        dataMap.get('expert2'),
        dataMap.get('expert3'),
        dataMap.get('expert4'),
    ];

        // As we have used custom buttons, we need a reference variable to
        // change the state
        const [slider, setSlider] = React.useState<Slider | null>(null);
      
        // These are the breakpoints which changes the position of the
        // buttons as the screen size changes
        const top = useBreakpointValue({ base: '90%', md: '50%' });
        const side = useBreakpointValue({ base: '30%', md: '40px' });

        const cards = [
            {
              title: "Expert 1",
              text:
                "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
              },
            {
              title: 'Expert 2',
              text:
                "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
            },
            {
              title: 'Expert 3',
              text:
                "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
              },
            
          ];
  
    return (
        <Center>
        <Box
        position={"relative"}
        height={'800px'}
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
          {cards.map((card, index) => (
            <Box
              key={index}
              height={'full'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"              
              >
                
              {/* This is the block you need to change, to customize the caption */}
              <ShowcaseUI data={myDataArray[index]}></ShowcaseUI>         
              
            </Box>
          ))}
        </Slider>
      </Box>
      </Center>
    );
  
    function techStackButton(text: string) {
      return <Button rounded={"base"}>{text}</Button>;
    }
  }


export const getServerSideProps = async () => {
    try{
      console.log('connecting to mongo')
      await dbConnect()
      console.log('connected to mongo')
  
      console.log('Fetching document')
      const expertsquads = await ExpertSquad.find().sort({$natural: -1 })
      console.log('Fetched document')
  
      return{
        props: {
          expertsquads: JSON.parse(JSON.stringify(expertsquads))
        }
      };
    }catch(error){
      console.log("ERROR HAPPENNED. WHY? WHO KNOWS MAN");
  
      return{notFound: true,}
    }
  };
  