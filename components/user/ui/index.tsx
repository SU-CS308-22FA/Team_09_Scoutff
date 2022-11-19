import {
  Box,
    Button,
    Center,
    Container,
    Flex,
    GridItem,
    FormControl,
    SimpleGrid,
    FormLabel,
    Select,
    Heading,
    Image,
    Input,
    Stack,
    HStack,
    VStack,
    Text
  } from "@chakra-ui/react";
  import ConfirmButton from "./ConfirmButton";
  import { decode, getToken } from "next-auth/jwt"
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import Router, { useRouter } from "next/router"
import { GetServerSideProps } from "next/types"
import React, { useEffect, useState } from "react"
import invariant from "tiny-invariant"

  interface Props {
    csrfToken: string,
    token: string,
  }

  export const getServerSideProps : GetServerSideProps = async (context) => {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }
  

  export default function UserCompIndex({ csrfToken } : Props) {

    const router = useRouter()




  const deleteUserData = async () => {
    if (!csrfToken) {
      return
    }

    const res = await fetch('/api/auth/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        csrfToken: csrfToken,
      }),
    })
    const data = await res.json()
    if (data.error) {
    } else {
      //send to login page with router
      router.push('/api/auth/signin')


      
    }
  }
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    const currentTarget = e.currentTarget

   





    //Get name password and email from form
    //currentTarget has property of name, email, password

    const target = e.currentTarget as typeof e.currentTarget & {
      name: { value: string };
      password: { value: string };
    };


    const name = target.name.value
    const password = target.password.value

    // if all of the fields are empty, do nothing
    if (!name  && !password) {
      return
    }





    await signIn("update-account", { name : name,password : password, redirect: false })


    

  }

  const { data: session } = useSession()
  if (session) {
    return (
      <Container maxW="container.xl" p={0}>
    <Flex h="100vh" py={20}>
      <><VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start">
          <Heading size="2xl">Preferences</Heading>
          <Text>Change your preferences.</Text>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="Name" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Last Name" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type={"password"} placeholder="*******" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input type={"password"} placeholder="*******"/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
          </GridItem>
          <GridItem colSpan={1}>
            <Button size="lg" w="full" bg="green.300" color="whiteAlpha.900">
              Update
            </Button>
          </GridItem>
          <GridItem colSpan={1}>
      <ConfirmButton
              headerText="Delete this account?"
              bodyText="Are you sure you want to delete your account? This cannot be undone."
              onSuccessAction={() => {
                console.log("Successfully Deleted");
              }}
              buttonText="Delete Account"
              isDanger={true}
            />
            </GridItem>
        </SimpleGrid>
      </VStack>
      <VStack
        w="full"
        h="full"
        p={10}
        spacing={10}
        align="flex-start"
        bg="gray.50"
      >
          <VStack alignItems="flex-start" spacing={3}>
            <Heading size="2xl">Personal Information</Heading>
            <Text>Change your personal info.</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={2}>
            
        
          <FormControl>
              <FormLabel>Favorite Team</FormLabel>
              <Select>
                <option value="na">None</option>
                <option value="adn">Adana Demirspor</option>
                <option value="aln">Alanyaspor</option>
                <option value="ant">Antalyaspor</option>
                <option value="bjk">Beşiktaş</option>
                <option value="fkg">Fatih Karagümrük</option>
                <option value="fb">Fenerbahçe</option>
                <option value="gs">Galatasaray</option>
                <option value="gfk">Gaziantep FK</option>
                <option value="grs">Giresunspor</option>
                <option value="hts">Hatayspor</option>
                <option value="bsk">İstanbul Başakşehir</option>
                <option value="ist">İstanbulspor</option>
                <option value="ksm">Kasımpaşa</option>
                <option value="kys">Kayserispor</option>
                <option value="kon">Konyaspor</option>
                <option value="ank">MKE Ankaragücü</option>
                <option value="svs">Sivasspor</option>
                <option value="ts">Trabzonspor</option>
                <option value="umr">Ümraniyespor</option>
              </Select>
            </FormControl>
            </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Favorite Player</FormLabel>
              <Select>
                <option value="na">None</option>
              </Select>
            </FormControl>
            </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Favorite Expert</FormLabel>
              <Select>
                <option value="na">None</option>
              </Select>
            </FormControl>
            </GridItem>
            
            </SimpleGrid>
        </VStack></>
        </Flex>
  </Container>
    );
  }
  return (
    <div >
      <p>You are not signed in</p>
    </div>
  )
  }