import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, Heading, Input } from "@chakra-ui/react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken, getSession, GetSessionParams, signIn } from "next-auth/react"
import Layout from "../../components/layout/Layout"
import * as React from "react";
import { Center, Image, Flex, Badge, Text, Stack, FormControl, FormLabel, Checkbox, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { useRouter } from "next/router"
import { useState } from "react"


export default function SignIn(/*{ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>*/) {

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




    const result = await signIn('login',
    {
      redirect: false,
      email: target.email.value,
      password: target.password.value,
    })


 

    if (result && result.error) {
      setErrorMessage(result.error)

    } else {
      router.push('/profile')
    }

 
  

    


  }
  

    return (
 <div>
   
<Layout>
  

<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <form onSubmit={handleFormSubmit}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link href="/auth/forgot" color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
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
                  Don't have an account? <Link href='./register' color={'blue.400'}>Sign Up </Link>
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

</Layout>
      </div>
    )

    
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