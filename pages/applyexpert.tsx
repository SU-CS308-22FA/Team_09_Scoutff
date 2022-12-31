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
import { Readable } from 'stream';
import { resolve } from 'path';



const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string));
    reader.onerror = error => reject(error);
});

async function getPdfAsBase64(files: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const fileStream = new Readable();
      fileStream.push(files);
      fileStream.push(null);
      fileStream.on('error', (error) => reject(error));
      fileStream.on('data', (chunk) => chunks.push(chunk));
      fileStream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
    });
  }

export default function Applyexpert() {

    type FormValues = {
        firstName: string;
        lastName: string;
        email: string;
        pdf: Array<File>
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
    
        const file = data.pdf?.at(0)
        //const fileconst = file ? await toBase64(file) : undefined
        const fileconst = file ? await getPdfAsBase64(file) : undefined

        await axios.post("/api/applyexpert", {
            firstname : data.firstName,
            lastname : data.lastName,
            email : data.email,
            pdf : fileconst
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
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                        <HStack>
                                <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" {...register("firstName")} />
                                </FormControl>
                                </Box>
                                <Box>
                                <FormControl id="lastName" isRequired >
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" {...register("lastName")} />
                                </FormControl>
                                </Box>
                            </HStack>
                            <VStack>
                            <FormControl id="email" isRequired isInvalid={Boolean(errors.email)}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" {...register("email", {
                                        required: 'This is required',
                                        pattern: { value: /[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, message: 'Please enter a valid email' },
                                    })} />
                                </FormControl>
                                <Spacer />
                                <FormControl id="pdf" isRequired >
                                <Dropzone
                                    onDrop={(files) => setFile(files)}
                                    maxSize={3 * 1024 ** 2}
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


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)


/*
    if (session) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        }
    }
*/
    return {
        props: {},
    }
}
