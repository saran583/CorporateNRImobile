// redux/rentalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentalType: "rental",
  userId: "",
  userName: ""
};

const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    setRentalType: (state, action) => {
      state.rentalType = action.payload;
    },
    setUserId: (state, action) =>{
      state.userId = action.payload;
    },
    setUserName: (state, action) =>{
      state.userName = action.payload
    }
  },
});

export const { setRentalType, setUserId, setUserName } = rentalSlice.actions;
export default rentalSlice.reducer;
