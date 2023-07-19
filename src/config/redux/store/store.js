import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducer/cartSlice";

const store = configureStore({
  reducer: {
    Cart: cartSlice,
  },
});

export default store;