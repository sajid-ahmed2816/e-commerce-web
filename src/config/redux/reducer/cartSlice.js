// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    increment(state, action) {
      const item = action.payload;
      const existingItem = state.find((x) => x.product === item.product && x.variant === item.variant);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    decrement(state, action) {
      const { product, variant } = action.payload;
      const existingItem = state.find((x) => x.product === product && x.variant === variant);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          const index = state.indexOf(existingItem);
          state.splice(index, 1);
        }
      }
    },
    remove(state, action) {
      const { product, variant } = action.payload;
      const index = state.findIndex((x) => x.product === product && x.variant === variant);
      if (index > -1) state.splice(index, 1);
    },
    reset(state) {
      state.splice(0, state.length);
    },
  },
});

export const { increment, decrement, remove, reset } = CartSlice.actions;
export default CartSlice.reducer;