import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Wrap, UnorderedList, ListItem, Input, Textarea, Center, useToast
  } from "@chakra-ui/react";
  import React from "react";
  import Comments from "../../../models/Comments";
  import { useState } from "react";
import axios from "axios";


  
  export default function HelpUI() {

    const toast = useToast()

    const [comment, setValue] = useState('');


    const handleSubmit = async () => {

        await axios.post("/api/comment", {
          comment
        })

        toast({
            title: "Comment added.",
            description: "Your comment has been added.",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
        
    }
    
    return (
        <Flex p={8} flex={1} marginLeft='100px'>
            <Stack>
              <Heading>Frequently Asked Questions</Heading>
              <UnorderedList fontSize='20px'>
                <ListItem marginTop='20px'>What happens when I add a player to my favorites</ListItem>
                <Text>You can receive emails about that player weekly</Text>  
                <ListItem marginTop='20px'>Can I see leaderoards without creating an account?</ListItem>
                <Text>Yes, guest users can examine leaderboards</Text> 
                <ListItem marginTop='20px'>Which framework did you use?</ListItem>
                <Text>Next.js mostly</Text>
              </UnorderedList>
            </Stack>

            <Stack marginLeft='200px' w='800px' h='800px'>
              <Center fontSize='20px'>Suggestions or complaints</Center>
              <Input value={comment} onChange={({target})=> setValue(target?.value)} width='800px' placeholder='What do you think about Scoutff?'/>

              <Button onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Flex>

    );
  
    function techStackButton(text: string) {
      return <Button rounded={"base"}>{text}</Button>;
    }
  }
