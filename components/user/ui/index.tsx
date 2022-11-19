import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import UserUI from "./UserUI";

const UserCompIndex = () => {
  return (
    <Container maxW="container.xl" p={0}>
    <Flex h="100vh" py={20}>
<UserUI></UserUI> 
</Flex>
  </Container>
  );
};

export default UserCompIndex;