import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IJourney } from "../../types/app";

interface IJourneyState {
  journey: IJourney[];
}

const initialState: IJourneyState = {
  journey: [],
};

export const journeySlice = createSlice({
  name: "journey",
  initialState,
  reducers: {
    SET_JOURNEY: (state, action: PayloadAction<IJourney[]>) => {
      state.journey = action.payload;
    },
  },
});

export const { SET_JOURNEY } = journeySlice.actions;
export default journeySlice.reducer;
