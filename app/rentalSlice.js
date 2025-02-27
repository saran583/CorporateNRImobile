// redux/rentalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentalType: "rental",
};

const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    setRentalType: (state, action) => {
      state.rentalType = action.payload;
    },
  },
});

export const { setRentalType } = rentalSlice.actions;
export default rentalSlice.reducer;
