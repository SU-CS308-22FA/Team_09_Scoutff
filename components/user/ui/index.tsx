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
    Text,
    useToast,
    Alert,
    AlertIcon,
    AlertDescription
  } from "@chakra-ui/react";
  import ConfirmButton from "./ConfirmButton";
  import { decode, getToken } from "next-auth/jwt"
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import Router, { useRouter } from "next/router"
import { GetServerSideProps } from "next/types"
import React, { useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { SubmitHandler, useForm } from "react-hook-form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"

import {BiUpload} from "react-icons/bi"

import {AiOutlineClose} from "react-icons/ai"

import { BiPhotoAlbum } from "react-icons/bi";


const toBase64 = (file: Blob)  => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve((reader.result as string));
  reader.onerror = error => reject(error);
});


  interface Props {
    csrfToken: string,
    name: string,
  }

  export const getServerSideProps : GetServerSideProps = async (context) => {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }

  type FormValues = {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    image : Array<File>
  };
  

  export default function UserCompIndex({ name,csrfToken } : Props) {

    const toast = useToast()

    const router = useRouter()

    const names = name.split(" ")

    const [image,setImage] = useState<Array<File> | undefined>(undefined)


    

    const {
      handleSubmit,
      register,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<FormValues>()
    





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
  const handleUpdate :  SubmitHandler<FormValues>  = async (data) => {


    toast({
      title: "Updating...",
      status: "info",
      duration: 2000,
      isClosable: true,
    })


    
 
    //Join first and last name if any of 

    const newNames = [data.firstName,data.lastName].map((name,index) => name === "" ? (names.at(index) ?? "") : name ).join(" ")



  

    const img = image?.at(0)






    const imageConst =   img ?  await toBase64(img) : undefined

    






    if (data && (data.password === data.confirmPassword)) {


        await signIn("update-account", { ...data ,image : imageConst ?? undefined, name : (newNames === name) ? "" : newNames,redirect: false })

        toast({
          title: "Updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        })

    }
    else {
      toast({
        title: "Invalid form format",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }

    

   

 







    

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
        <form onSubmit={handleSubmit(handleUpdate)}>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder={names.at(0)}  {...register("firstName")}/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder={names.at(1)} {...register("lastName")}/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type={"password"} placeholder="*******" {...register("password")} />

            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid={Boolean(errors.confirmPassword)}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type={"password"} placeholder="*******" {...register("confirmPassword",{
                validate: (value) => value === watch("password") || "Passwords don't match.",
              })}/>

        
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Dropzone 
                  onDrop={(files) => setImage(files)}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={3 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  multiple={false}>


                    

              <Center>
                <HStack spacing={5}>
                  <Dropzone.Accept>
                    <BiUpload/>
                    
                  </Dropzone.Accept>

                  <Dropzone.Reject>
                    <AiOutlineClose/>
                  </Dropzone.Reject>

                  <Dropzone.Idle>
                    <BiPhotoAlbum/>
                  </Dropzone.Idle>

                  <Text>
                    {image ? image.at(0)?.name : "Drop your image here"}

                  </Text>

                </HStack>


              </Center>
            </Dropzone>
    
          </GridItem>
          <GridItem colSpan={2}>
          </GridItem>
          <GridItem colSpan={1}>
            <Button size="lg" w="full" bg="green.300" color="whiteAlpha.900"                   type='submit'
                  loadingText="Submitting">
              Update
            </Button>
          </GridItem>
          <GridItem colSpan={1}>
      <ConfirmButton
              headerText="Delete this account?"
              bodyText="Are you sure you want to delete your account? This cannot be undone."
              onSuccessAction={() => {
                deleteUserData()
                toast({
                  title: "Account Deletion.",
                  description: "Your account is being deleted.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                })


                
              }}
              buttonText="Delete Account"
              isDanger={true}
            />
            </GridItem>
        </SimpleGrid>
        </form>
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