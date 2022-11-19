import {
  Box,
    Button,
    Center,
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
  import React from "react";
  import ConfirmButton from "./ConfirmButton";


  
  

  export default function UserUI() {

    return (
      
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
    );
  }
