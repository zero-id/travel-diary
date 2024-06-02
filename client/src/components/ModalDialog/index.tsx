import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
} from "@chakra-ui/react";

import imgleft from "../../assets/imgauthleft.png";
import imgright from "../../assets/imgauthright.png";

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  cildren: React.ReactNode;
}

export default function ModalDialog({
  isOpen,
  onClose,
  title,
  cildren,
}: ModalDialogProps) {
  return (
    <>
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          rounded={"2xl"}
          className="scrollbar-hide"
          maxH={"450px"}
          overflow={"auto"}
          pos={"relative"}
        >
          <Image
            zIndex={10}
            rounded={"xl"}
            pos={"fixed"}
            w={"50px"}
            src={imgleft}
          />
          <Image
            zIndex={10}
            rounded={"xl"}
            pos={"fixed"}
            w={"90px"}
            ms={230}
            src={imgright}
          />
          <ModalHeader py={7} textAlign={"center"}>
            <Text fontWeight={"900"}>{title}</Text>
          </ModalHeader>
          <ModalCloseButton zIndex={20} />
          <ModalBody>{cildren}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
