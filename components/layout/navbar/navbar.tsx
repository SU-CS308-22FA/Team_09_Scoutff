import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Avatar,
  HStack,
  IconButton,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack, 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { getSession, signOut, useSession } from "next-auth/react";
import { ApolloClient, gql, HttpLink, InMemoryCache, NormalizedCacheObject, useApolloClient, useQuery } from "@apollo/client";
import { useApp } from "../../../hook/useApp";
import * as Realm from "realm-web";
import useDebounce from  "../../../hook/useDebounce";
import SearchBar from "../../../pages/search";
import { getToken } from "next-auth/jwt";
import router, { useRouter } from "next/router";
import axios from "axios";
//import React from "react";
// const Links = ["Dashboard", "Projects", "Team"];
const Links = [

  {
    name: "Leaderboards",
    path: "/leaderboards",
  },
  
];
const LogoLink = [
  {
    name:"Scoutff" ,
    path: "/",
  },
];
const dropdownLink1 = [
  {
    name:"Profile" ,
    path: "/profile",
  },
];
const dropdownLink2 = [
  {
    name:"Help" ,
    path: "/help",
  },
 
];
const dropdownLink3 = [
  {
    name:"Log Out" ,
    path: "/auth/signin",
    
  },
];
const dropdownLink4 = [
  {
    name:"Expert Squads" ,
    path: "/squadsView",
  },
];
const dropdownLink5 = [
  {
    name:"Scoutff Squads" ,
    path: "/customsquads",
  },
];
const dropdownLink6 = [
  {
    name:"Squads Showcase" ,
    path: "/squads_showcase",
  },
];
const buttonLink = [
  {
    name:"Favourite Players 🌟" ,
    path: "/favorites",
    
  },
];





const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (

  
  


  

  <Box
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.100", "gray.700"),
    }}
  >
    <Link href={path}>{children}</Link>
  </Box>
);

export default function Navbar(props : any) {

  const toast = useToast();
  const client = useApolloClient();

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();


  const session = useSession();

 







  const app = useApp();
  //const btnRef = useRef();



  



  return (
    <>
    
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={8}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          
          <HStack
              as={"nav"}
              paddingLeft= {"10px"}
              fontWeight={"bold"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >

    {session.data?.user.role === "admin" && (
      <Button /*ref={btnRef}*/ bg={"black"} textColor={"white"} onClick={onOpen} fontWeight="bold" size={"sm"} >
        Admin 
      </Button>
    )}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        //finalFocusRef={btnRef}
        size={"xs"}
        //closeOnOverlayClick= {true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Administration</DrawerHeader>
          <DrawerBody>

            <VStack spacing={10}>
            <Button onClick={() =>{
              onClose()
               router.push('/evaluation')
               }} > Evaluate Applications </Button>

          <Button onClick={() =>{
                toast({
                  title: "Weekly Reports tried",
                  description: "We've tried  the weekly reports to all the users",
                  status: "info",
                  duration: 2000,
                  isClosable: true,
                })
                 axios.post('/api/manual').then((res) => {
                  toast({
                    title: "Weekly Reports sent",
                    description: "We've sent the weekly reports to all the users",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  })
                }).catch((err) => {
                  toast({
                    title: "Weekly Reports failed",
                    description: "We've failed to send the weekly reports to all the users",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  })
                })
                

                
               
               }} > Send Weekly Reports
              </Button>
            </VStack>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
                 {LogoLink.map(({ name, path }) => ( 
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
              
            </HStack>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
            <SearchBar/>
            </HStack>
          <Flex alignItems={"center"}>
            
          <HStack
              as={"nav"}
              spacing={4}
              fontWeight={"semibold"}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ name, path }) => (
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </HStack>

            <Menu>
  {({ isOpen }) => (
    <>
      <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
        {isOpen ? 'Squads' : 'Squads'}
      </MenuButton>
      <MenuList>
        
      {dropdownLink4.map(({ name, path }) => (
                      <NavLink key={path} path={path}>
                            <MenuItem >
                          <HStack
                          as={"nav"}
                          spacing={4}
                          display={{ base: "none", md: "flex" }}
                          >
                          </HStack>
                          {name}
                        </MenuItem>
                      </NavLink>
                    ))}
        {dropdownLink5.map(({ name, path }) => (
                      <NavLink key={path} path={path}>
                            <MenuItem >
                          <HStack
                          as={"nav"}
                          spacing={4}
                          display={{ base: "none", md: "flex" }}
                          >
                          </HStack>
                          {name}
                        </MenuItem>
                      </NavLink>
                    ))}
                          {dropdownLink6.map(({ name, path }) => (
                    <NavLink key={path} path={path}>
                            <MenuItem >
                          <HStack
                          as={"nav"}
                          spacing={4}
                          display={{ base: "none", md: "flex" }}
                          >
                          </HStack>
                          {name}
                        </MenuItem>
                      </NavLink>
                    ))}
      </MenuList>
    </>
  )}
</Menu>
            
            <Button
              variant={"outline"}
              colorScheme={"blue"}
              size={"sm"}
              mr={4}
              //leftIcon={<AddIcon />}
            >
              <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {buttonLink.map(({ name, path }) => (
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}

              {}
            </HStack>
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"md"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar
                  size={"sm"}
                  src={
                    (session?.data?.user?.image === "undefined" ? undefined : session?.data?.user?.image) ?? undefined
                  }
                />
              </MenuButton>
              <MenuList>
                {}



                  
                  {dropdownLink1.map(({ name, path }) => (
                      <NavLink key={path} path={path}>
                            <MenuItem >
                          <HStack
                          as={"nav"}
                          spacing={4}
                          display={{ base: "none", md: "flex" }}
                          >
                          </HStack>
                          {name}
                        </MenuItem>
                      </NavLink>
                    ))}
                    
      
                    <MenuDivider />



                  {dropdownLink2.map(({ name, path }) => (
                          <NavLink key={path} path={path}>
                             <MenuItem>
                             <HStack
                              as={"nav"}
                              spacing={4}
                              display={{ base: "none", md: "flex" }}
                              >
                          </HStack>
                          {name}
                          </MenuItem>
                          </NavLink>
                          
                        ))}

                     
                      <MenuDivider />
                      <MenuItem  onClick={async () => {
                        await client.cache.reset()
                  

                        localStorage.clear()
                        
                        await signOut({callbackUrl: "/auth/signin"})


                      }
                      }
                      textColor={"red"}
                      ><HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                  >
                        <div>
                          {session?.data  ? "Log Out" : "Log In"}
                        </div>
                    
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ name, path }) => (
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}