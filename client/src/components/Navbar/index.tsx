import { Box, Image, Text } from "@chakra-ui/react";
import IconMaps from "../../assets/mapsicon.png";
import AvatarComponenet from "./Avatar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box
      color={"black"}
      shadow={"lg"}
      bgColor={"white"}
      px={8}
      py={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      position={"fixed"}
      left={0}
      right={0}
      top={0}
      zIndex={10}
    >
      <Box
        cursor={"pointer"}
        onClick={() => navigate("/")}
        display={"flex"}
        alignItems={"center"}
      >
        <Text fontFamily={"summer-vibes"}>The Journey</Text>
        <Image w={"25px"} src={IconMaps} />
      </Box>
      <AvatarComponenet />
    </Box>
  );
};

export default Navbar;
