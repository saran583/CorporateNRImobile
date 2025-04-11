// redux/rentalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentalType: "rental",
  userId: "",
  userName: "",
  userEmail: "",
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
    },
    setUserEmail: (state, action) =>{
      state.userEmail = action.payload
    }
  },
});

export const { setRentalType, setUserId, setUserName, setUserEmail } = rentalSlice.actions;
export default rentalSlice.reducer;
