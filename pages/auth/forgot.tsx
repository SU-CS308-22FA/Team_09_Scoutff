import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    Wrap, 
    Center,Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Container,useToast,
    TableCaption,
    TableContainer, Square, Circle, Box, HStack, Grid, Spacer, Divider, VStack, ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, useDisclosure, Alert, AlertDescription, AlertIcon, AlertTitle,
  } from "@chakra-ui/react";
  import React from "react";
  import { useState } from 'react';
  import router, { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
  


export default function Forgot() {

  type FormValues = {
    email: string;
  };
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  
  const toast = useToast()
  const [errorMessage, setErrorMessage] = useState<String>("");
  
const handleFormForgot :  SubmitHandler<FormValues>   = async (data) => {




    const emailSend = await signIn('email', {email : data.email, redirect: false})
    if (emailSend && emailSend.error) {
      setErrorMessage(emailSend.error)
      return
    }

    toast({
      title: "Success.",
      description: "We've sent you an email with a link to reset your password.",
      status: "success",
      duration: 9000,
      isClosable: true,
    })

    setErrorMessage("")
}
    
    return (
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          
              <Box textAlign="center">
                <Heading>Input your email address:</Heading>
              </Box>
              <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit(handleFormForgot)}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="test@test.com"
                      size="lg"
     
                      {...register("email")}
                      
                    />
                  </FormControl>

                  
                  
                  <Button
                    variant="solid"
                    type="submit"
                    width="full"
                    color={'blue'}
                    mt={4}
                  >
                    Submit
                  </Button>
             </form>

             {
              errorMessage &&      
              <Stack pt={3}>
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
             </Stack>
            }
              </Box>
            
          
        </Box>
      </Flex>
    );
  }


  