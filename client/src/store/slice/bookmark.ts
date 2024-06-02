import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBookmark, IJourney } from "../../types/app";

interface IBookmarkState {
  bookmark: IBookmark;
}

const initialState: IBookmarkState = {
  bookmark: {
    userId: 0,
    journeyId: 0,
    journey: {} as IJourney,
    createdAt: "",
    updatedAt: "",
  },
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    SET_BOOKMARK: (state, action: PayloadAction<IBookmark>) => {
      state.bookmark = action.payload;
    },
  },
});

export const { SET_BOOKMARK } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
