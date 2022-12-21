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
  } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Layout from "../../components/layout/Layout"
import * as React from "react";
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm, FieldError, SubmitHandler } from 'react-hook-form'

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

  
  export default function SignupCard() {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<String>("");

    const toast = useToast()

    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm<FormValues>()
    

    


    const handleFormSubmit :  SubmitHandler<FormValues>  = async (data) => {


      
  
  

  
  
      const result = await signIn('register',
      {
        redirect: false,
        name : `${data.firstName} ${data.lastName}`,
        ...data,
      })


      const error = result?.error

      if (error && error !== "EmailNotVerified") {
        setErrorMessage(error)
        return
      }

  
      console.log(result, "register result")
  
      const emailSend = await signIn('email', {email : data.email, redirect: false})

      if (emailSend && emailSend.error) {
        setErrorMessage(emailSend.error)
        return
      }

      toast({
        title: "Registration successful.",
        description: "We've sent you an email with a link to verify your account.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
  
      setErrorMessage("")
      
      
  
   
    
  
      
  
  
    }

    
    
    
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
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
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" {...register("lastName")} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired isInvalid={Boolean(errors.email)}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email",{
                required: 'This is required',
                pattern: { value: /[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, message: 'Please enter a valid email' },
              })} />
              </FormControl>
              <FormControl id="password" isRequired isInvalid={Boolean(errors.password)}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                  {...register('password', {
                required: 'This is required',
                minLength: { value: 8, message: 'Minimum length should be minimum 8!' },
                maxLength: { value: 20, message: 'Maximum length should be maximum 20!' }
              })}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                    
                  </InputRightElement>

                </InputGroup>
                <Stack pt={4}>
                  { errors.email &&

        <Alert status='error'>
                 <AlertIcon />
                  <AlertDescription>{errors.email && errors.email.message?.toString()}</AlertDescription>
                </Alert>
        }
             </Stack>
                  <Stack pt={4}>
                  { errors.password &&

        <Alert status='error'>
                 <AlertIcon />
                  <AlertDescription>{errors.password && errors.password.message?.toString()}</AlertDescription>
                </Alert>
        }
             </Stack>
                
                  
                  

              </FormControl>
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
                  Sign up
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
       

              <Stack pt={3}>
                <Text align={'center'}>
                  Already a user? <Link href='./signin' color={'blue.400'}>Login</Link>
                </Text>
                <Text align={'center'}>
                  <Link href='/' color={'blue.400'}>Continue as a Guest</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
          </form>
        </Stack>
      </Flex>
    );
  }


  export  const getServerSideProps : GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(context.req, context.res,authOptions)


    
    if (session) {
        return {
        redirect: {
            destination: '/profile',
            permanent: false,
        },
        }
    }
    
    return {
        props: {  },
    }
    }
