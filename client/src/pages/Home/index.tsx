import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FormSearch from "../../components/FormSearch";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getAllJourneyApi, searchJourney } from "../../libs/api/call/journey";
import { IJourney } from "../../types/app";
import { useAppDispatch, useAppSelector } from "../../store";
import CardJourney from "../../features/journey/components/CardJourney";
import { SET_JOURNEY } from "../../store/slice/journey";
import HeroSection from "./HeroSection";

const Home = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const journey = useAppSelector((state) => state.journey.journey);

  const getAllJourneys = async () => {
    try {
      const response = await getAllJourneyApi();
      dispatch(SET_JOURNEY(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<IJourney[]>([]);

  const handleSubmit = async () => {
    const response = await searchJourney(search);

    setSearchResult(response.data.data);
  };

  useEffect(() => {
    getAllJourneys();
  }, []);

  return (
    <Box minH={"100vh"} bgColor={"#ededed"}>
      {auth.user ? <Navbar /> : <HeroSection />}

      {/* <Navbar /> */}
      <Box
        mt={{ lg: "40px", base: "30px" }}
        display={"flex"}
        flexDirection={"column"}
        gap={8}
        p={{ lg: 8, base: 4 }}
      >
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Journey
        </Text>
        <FormSearch setSearch={setSearch} handleSubmit={handleSubmit} />
        <SimpleGrid columns={{ lg: 4, md: 3, sm: 2 }} spacing={8}>
          {searchResult.length > 0
            ? searchResult.map((journey: IJourney) => (
                <CardJourney journey={journey} key={journey.id} />
              ))
            : journey.map((journey: IJourney, index: number) => (
                <CardJourney journey={journey} key={index} />
              ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
