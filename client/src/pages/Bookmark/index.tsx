import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store";
import CardJourney from "../../features/journey/components/CardJourney";
import { getBookmarkAPI } from "../../libs/api/call/bookmark";
import { useEffect } from "react";
import { SET_BOOKMARK } from "../../store/slice/bookmark";
import { IBookmark } from "../../types/app";

const BookMark = () => {
  const dispatch = useAppDispatch();
  const bookmark = useAppSelector((state) => state.bookmark.bookmark);

  const bookArray = Array.isArray(bookmark) ? bookmark : [];

  const getBookmark = async () => {
    try {
      const res = await getBookmarkAPI();

      dispatch(SET_BOOKMARK(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);
  
  return (
    <Box minH={"100vh"} bgColor={"#ededed"} mt={"40px"}>
      <Navbar />
      <Box display={"flex"} flexDirection={"column"} gap={8} p={8}>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Bookmark
        </Text>
        <SimpleGrid columns={{ lg: 4, md: 2, base: 1 }} spacing={8}>
          {bookArray.map((item: IBookmark, index: number) => (
            <CardJourney key={index} {...item} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default BookMark;
