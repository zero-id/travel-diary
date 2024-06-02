import { Box } from "@chakra-ui/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IJourney } from "../../types/app";
import { useAppDispatch, useAppSelector } from "../../store";
import React, { useEffect, useState } from "react";
import {
  createBookmarkAPI,
  getBookmarkAPI,
} from "../../libs/api/call/bookmark";
import { SET_BOOKMARK } from "../../store/slice/bookmark";
import { getUser } from "../../libs/api/call/user";
import { SET_LOGIN } from "../../store/slice/auth";

interface IButtonBookmark {
  journey?: IJourney | undefined;
}

const ButtonBookmark: React.FC<IButtonBookmark> = ({ journey }) => {
  const dispatch = useAppDispatch();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const auth = useAppSelector((state) => state.auth);

  const checkBookmark = () => {
    if (auth.user) {
      if (journey?.id) {
        const bookmark = auth?.user?.bookmark?.find(
          (book) => book.journey.id === journey.id
        );

        setIsBookmark(bookmark ? true : false);
      }
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await createBookmarkAPI({ journeyId: journey?.id });
      const resUser = await getUser(localStorage.token);
      const resBook = await getBookmarkAPI();

      dispatch(SET_BOOKMARK(resBook.data.data));
      dispatch(
        SET_LOGIN({ user: resUser.data.data, token: localStorage.token })
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkBookmark();
  });

  return (
    <>
      <Box
        shadow={"lg"}
        w={"30px"}
        h={"30px"}
        rounded={"full"}
        bgColor={"white"}
        pos={"absolute"}
        top={2}
        right={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={handleBookmark}
      >
        {isBookmark ? <FaBookmark /> : <FaRegBookmark color="blue" />}
      </Box>
    </>
  );
};

export default ButtonBookmark;
