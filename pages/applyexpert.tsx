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
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Layout from "../components/layout/Layout"
import * as React from "react";
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm, FieldError, SubmitHandler } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai';
import { BiUpload, BiPhotoAlbum } from 'react-icons/bi';

const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string));
    reader.onerror = error => reject(error);
});

export default function Applyexpert() {

    type FormValues = {
        email: string;
        pdf: Array<File>
    };

    const [errorMessage, setErrorMessage] = useState<String>("");

    const toast = useToast()

    const [pdf, setImage] = useState<Array<File> | undefined>(undefined)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>()

    const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {

        /*
    
        add application details to database
    
        */

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
                            <VStack>
                            <FormControl id="email" isRequired isInvalid={Boolean(errors.email)}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" {...register("email", {
                                        required: 'This is required',
                                        pattern: { value: /[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, message: 'Please enter a valid email' },
                                    })} />
                                </FormControl>
                                <Spacer />
                                <Dropzone
                                    onDrop={(files) => setImage(files)}
                                    onReject={(files) => console.log('rejected files', files)}
                                    maxSize={3 * 1024 ** 2}
                                    accept={IMAGE_MIME_TYPE}
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
                                                <BiPhotoAlbum />
                                            </Dropzone.Idle>
                                            <Text>
                                                Upload your document
                                            </Text>
                                        </HStack>
                                    </Center>
                                </Dropzone>
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
