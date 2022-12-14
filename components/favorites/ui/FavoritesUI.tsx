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
  
  export default function FavoritesUI() {
    return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              
              <br />{" "}
              <Text color={"green.400"} as={"span"}>
                <div>I love players</div>
                <br />
                <br />
                <Text as='mark'>-Arda Güler</Text>
                <br />
                <br />
                <Text as='b'>-Enner Valencia</Text>

              </Text>{" "}
            </Heading>


          </Stack>
        </Flex>
        <Flex flex={1}>

        </Flex>
      </Stack>
    );
  
    function techStackButton(text: string) {
      return <Button rounded={"base"}>{text}</Button>;
    }
  }
