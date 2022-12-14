import { ReactNode, useEffect, useState } from "react";
import { GraphQLProvider } from "../../../provider/GraphQLProvider";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { getSession, signOut, useSession } from "next-auth/react";
import { ApolloClient, gql, HttpLink, InMemoryCache, NormalizedCacheObject, useApolloClient, useQuery } from "@apollo/client";
import { useApp } from "../../../hook/useApp";
import * as Realm from "realm-web";
import useDebounce from  "../../../hook/useDebounce";
import SearchBar from "../../../pages/search";
import { getToken } from "next-auth/jwt";
// const Links = ["Dashboard", "Projects", "Team"];
const Links = [

  {
    name: "Squads",
    path: "/squadby",
  },
  {
    name: "Leaderboards",
    path: "/leaderboards",
  },
  {
    name: "",
    path: "/with-mongo-db",
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
  const client = useApolloClient();

  const { isOpen, onOpen, onClose } = useDisclosure();


  const session = useSession();






  const app = useApp();




  



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
              paddingLeft= {"50px"}
              fontWeight={"bold"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
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
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ name, path }) => (
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </HStack>


            
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
                    "https://bit.ly/sage-adebayo"
                  }
                />
              </MenuButton>
              <MenuList>



                  
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
                      <MenuItem  onClick={() => signOut({callbackUrl: "/auth/signin"})}
                      textColor={"red"}
                      ><HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                  >
                      <NavLink  path={session?.data ?  "/auth/signin" : "/api/auth/signout"}>
                        <div>
                          {session?.data  ? "Log Out" : "Log In"}
                        </div>
                      </NavLink>
                    
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