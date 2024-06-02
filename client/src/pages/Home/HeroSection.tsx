import { Box, Button, Image, Text, useDisclosure } from "@chakra-ui/react";
import ModalDialog from "../../components/ModalDialog";
import FormSignIn from "../../features/auth/components/FormSignIn";
import FormSignUp from "../../features/auth/components/FormSignUp";

import Banner from "../../assets/alam.jpg";
import IconMaps from "../../assets/mapsicon.png";
import TheJourney from "../../assets/thejourney.png";

const HeroSection = () => {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  return (
    <Box
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      w={"100%"}
      h={{ lg: "460px", base: "300px" }}
      bgImage={Banner}
      color={"white"}
      p={{ lg: 40, base: 4 }}
      pos={"relative"}
    >
      <Box
        position={"absolute"}
        left={{ lg: 12, base: 4 }}
        top={4}
        display={"flex"}
      >
        <Image w={"60px"} src={TheJourney} />
        <Image w={"25px"} src={IconMaps} />
      </Box>
      <Box position={"absolute"} right={8} top={8}>
        <Button
          size={"sm"}
          width={"100px"}
          me={"10px"}
          border={"1px solid white"}
          colorScheme="transparent"
          onClick={onOpenLogin}
        >
          Login
        </Button>
        <ModalDialog
          isOpen={isOpenLogin}
          onClose={onCloseLogin}
          title="Login"
          cildren={<FormSignIn onClose={onCloseLogin} />}
        />
        <Button
          size={"sm"}
          width={"100px"}
          colorScheme="blue"
          onClick={onOpenRegister}
        >
          Register
        </Button>
        <ModalDialog
          isOpen={isOpenRegister}
          onClose={onCloseRegister}
          title="Register"
          cildren={<FormSignUp onClose={onCloseRegister} onOpenLogin={onOpenLogin} />}
        />
      </Box>
      <Text
        lineHeight={"normal"}
        mt={{ base: 20, lg: 0 }}
        fontWeight={"bold"}
        fontSize={{ lg: "5xl", base: "2xl" }}
      >
        The Journey <br />
        you ever dreamed of.
      </Text>
      <Text>
        We made a tool so you can easily keep & share your travel memories.{" "}
        <br />
        But there is a lot more
      </Text>
    </Box>
  );
};

export default HeroSection;
