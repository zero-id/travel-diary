import { Avatar, Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useAppSelector } from "../../store";
import { FaUserCircle } from "react-icons/fa";
import CardJourney from "../../features/journey/components/CardJourney";
import { IJourney } from "../../types/app";

const Profile = () => {
  const auth = useAppSelector((state) => state.auth.user);
  console.log(auth?.journey, "ini auth");

  return (
    <Box minH={"100vh"} bgColor={"#ededed"} mt={"40px"}>
      <Navbar />
      <Box display={"flex"} flexDirection={"column"} gap={8} p={8}>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Profile
        </Text>
        <Box
          mb={10}
          mx={"auto"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {auth?.avatar ? (
            <Avatar p={1} size="2xl" name="Dan Abrahmov" src={auth?.avatar} />
          ) : (
            <FaUserCircle size={100} color="black" />
          )}
          <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
            {auth?.fullname}
          </Text>
          <Text color={"gray.500"} textAlign={"center"}>
            {auth?.email}
          </Text>
          <Button size={"sm"} colorScheme="teal">
            Edit Profile
          </Button>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          {auth?.journey?.map((item: IJourney, index) => (
            <CardJourney key={index} journey={item} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Profile;
