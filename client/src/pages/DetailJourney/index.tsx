import { Box, Image, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { IJourney } from "../../types/app";
import Moment from "moment";

const DetailJourney = () => {
  const { id } = useParams();

  const journey = useAppSelector((state) => state.journey.journey);

  const journeyDetail: IJourney | undefined = journey.find(
    (item) => item.id === +id!
  );

  console.log(journeyDetail, "ini journeyDetail");

  return (
    <Box minH={"100vh"} bgColor={"#ededed"} mt={"40px"}>
      <Navbar />
      <Box display={"flex"} flexDirection={"column"} gap={8} p={8}>
        <Box>
          <Box
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text
              fontSize={{ lg: "4xl", md: "3xl", base: "2xl" }}
              fontWeight={"bold"}
            >
              {journeyDetail?.title}
            </Text>
            <Box lineHeight={"1"}>
              <Text fontSize={{ lg: "2xl", md: "xl", base: "lg" }}>
                {journeyDetail?.user.fullname}
              </Text>
              <Text
                fontSize={{ lg: "lg", md: "sm", base: "xs" }}
                color={"gray.500"}
              >
                {journeyDetail?.user.email}
              </Text>
            </Box>
          </Box>
          <Text color={"#3B97D3"}>
            {Moment(journeyDetail?.createdAt).format("LL")}
          </Text>
        </Box>
        <Box>
          <Image
            w={"100%"}
            h={{ lg: "500px", base: "300px" }}
            objectFit={"cover"}
            rounded={"2xl"}
            src={journeyDetail?.image}
          />
        </Box>
        {journeyDetail?.description && (
          <Text>
            <p
              dangerouslySetInnerHTML={{ __html: journeyDetail.description }}
            />
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default DetailJourney;
