import {
    Flex,
    Box,
    FormControl,
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
  
  export default function SignupCard() {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<String>("");



    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      
  
      
  
      const target = e.currentTarget as typeof e.currentTarget & {
        email: { value: string }
        password: { value: string }
        firstName: { value: string }
        lastName: { value: string }
      }

  
  

  
  
      const result = await signIn('register',
      {
        redirect: false,
        email: target.email.value,
        name: target.firstName.value + " " + target?.lastName?.value ?? "",
        password: target.password.value,
      })
  
      console.log(result, "register result")
  
      const emailSend = await signIn('email', {email : target.email.value, redirect: false})
  
      console.log(emailSend, "email send")
  
      if (result && result.error) {
        setErrorMessage(result.error)
  
      } else {
        router.push('/profile')
      }
  
   
    
  
      
  
  
    }

    
    
    
    const [showPassword, setShowPassword] = useState(false);
  
    return (
        <Layout>
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
          <form onSubmit={handleFormSubmit}>
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
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
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
              </Stack>
            </Stack>
          </Box>
          </form>
        </Stack>
      </Flex>
      </Layout>
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
