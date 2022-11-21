import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Wrap, UnorderedList, ListItem, Input, Textarea, Center
  } from "@chakra-ui/react";
  import React from "react";
  import Comments from "../../../models/Comments";
  import { useState } from "react";


  export default function HelpUI() {

    const [comment, setValue] = useState('');

    const handleSubmit = async () => {
      
      Comments.insertMany;
  
    }
    return (
        <Flex p={8} flex={1} marginLeft='100px'>
            <Stack>
              <Heading>Frequently Asked Questions</Heading>
              <UnorderedList fontSize='20px'>
                <ListItem marginTop='20px'>Who built this website?</ListItem>
                <Text>Erhan and some of his friends</Text>
                <ListItem marginTop='20px'>What happens when I add a player to my favorites</ListItem>
                <Text>You can receive emails abut that player weekly</Text>  
                <ListItem marginTop='20px'>Which framework did you use?</ListItem>
                <Text>Next.js mostly</Text>
              </UnorderedList>
            </Stack>

            <Stack marginLeft='200px' w='800px' h='800px'>
              <Center fontSize='20px'>Suggestions or complaints</Center>
              <Input value={comment} width='800px' placeholder='What do you think about Scoutff?'/>

              <Button onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Flex>

    );
  
    function techStackButton(text: string) {
      return <Button rounded={"base"}>{text}</Button>;
    }
  }
