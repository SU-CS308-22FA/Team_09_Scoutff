import {
    Flex,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    useToast,
    Center,
    VStack,
    Spacer,
    Textarea,
} from '@chakra-ui/react';
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Layout from "../components/layout/Layout"
import * as React from "react";
import { useRef, useState } from 'react';
import { AttachmentIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm, FieldError, SubmitHandler } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai';
import { BiUpload, BiPhotoAlbum } from 'react-icons/bi';
import axios from 'axios';






const toBase64 = (file: Blob)  => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string));
    reader.onerror = error => reject(error);
  });
  


export default function Applyexpert() {

    type FormValues = {
        firstName: string;
        lastName: string;
        email: string;
        bio?: string
        pdf: Array<File>;
    };

    const [errorMessage, setErrorMessage] = useState<String>("");

    const toast = useToast()

    const [pdf, setFile] = useState<Array<File> | undefined>(undefined)


    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>()

    

    const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {

        console.log(data)
    
        const file = pdf?.at(0)
        if (!file) {
            setErrorMessage("Please upload a resume.")
            return
            
        }

        const filebase64 = await toBase64(file) 

        //check if filebase64 is not string
        if (typeof filebase64 !== "string") {
            setErrorMessage("Error converting image.")
            return
        }


        if( data?.bio ==="")
        {
            delete data.bio
        }


          



        await axios.post("/api/applyexpert", {
        
            bio : data.bio,
            pdf : filebase64,
        })
        

        toast({
            title: "Application successful.",
            description: "We've received your application.",
            status: "success",
            duration: 9000,
            isClosable: true,
        })

        setErrorMessage("")

    }


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Apply to become an Expert
                    </Heading>
                </Stack>
                <form onSubmit={/*send to profile*/
                    handleSubmit(handleFormSubmit)}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
           
                            <VStack>
    
                            <FormControl id="bio">
                                    <FormLabel>Please talk about yourself briefly</FormLabel>
                                    <Textarea {...register("bio")}></Textarea>

                            </FormControl>
                                <Spacer />
                                <FormControl id="pdf" isRequired >
                                <Dropzone
                                    onDrop={(files) =>{
                                        setFile(files)
                                        toast({
                                            title: "Uploading...",
                                            status: "info",
                                            duration: 1000,
                                            isClosable: true,
                                          })
                                         
                                    }}
                                    maxSize={1024 * 1024 * 2}
                                    accept={PDF_MIME_TYPE}
                                    multiple={false}>
                                        
                                    <Center>
                                        <HStack spacing={5}>
                                            <Dropzone.Accept>
                                                <BiUpload />
                                            </Dropzone.Accept>
                                            <Dropzone.Reject>
                                                <AiOutlineClose />
                                            </Dropzone.Reject>
                                            <Dropzone.Idle>
                                                <AttachmentIcon />
                                            </Dropzone.Idle>
                                            <Text>
                                            {pdf ? pdf.at(0)?.name : "Upload your document"}
                                            </Text>
                                        </HStack>
                                    </Center>
                                </Dropzone>
                                </FormControl>
                            </VStack>
                            <Stack pt={4}>
                                {errors.email &&

                                    <Alert status='error'>
                                        <AlertIcon />
                                        <AlertDescription>{errors.email && errors.email.message?.toString()}</AlertDescription>
                                    </Alert>
                                }
                            </Stack>

                            <Stack spacing={10} pt={2}>
                                <Button
                                    type='submit'
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Submit
                                </Button>
                            </Stack>


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
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    );
}

