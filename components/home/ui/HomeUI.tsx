import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Wrap,
  } from "@chakra-ui/react";
  import React from "react";
  
  export default function HomeUI() {
    return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"} marginBottom='50px'>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "full",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  // bg: "blue.400",
                  zIndex: -1,
                }}
              >
                {"Welcome to"}
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                SCOUTFF
              </Text>{" "}
            </Heading>
           
            
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1772000/tff-iha-1772376.jpg"
            }
          />
        </Flex>
      </Stack>
    );
  
    function techStackButton(text: string) {
      return <Button rounded={"base"}>{text}</Button>;
    }
  }
