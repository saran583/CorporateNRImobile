// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rentalReducer from "./rentalSlice";

const store = configureStore({
  reducer: {
    rental: rentalReducer,
  },
});

export default store;
