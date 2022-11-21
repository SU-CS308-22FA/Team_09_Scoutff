import { Box } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface ConfirmButtonProps {
  onSuccessAction: () => void;
  headerText: string;
  bodyText: string;
  buttonText: string;
  isDanger?: boolean;
}

const ConfirmButton = ({
  onSuccessAction,
  buttonText,
  headerText,
  bodyText,
  isDanger,
}: ConfirmButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    onSuccessAction();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} size="lg" w="full" colorScheme={isDanger ? "red" : ""}>
        {buttonText} 
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>{bodyText}</Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Close
            </Button>
            <Button colorScheme={isDanger ? "red" : ""} onClick={onSubmit}>
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmButton;