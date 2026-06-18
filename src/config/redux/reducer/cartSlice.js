// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    increment(state, action) {
      const item = action.payload;
      const existingItem = state.find((x) => x._id === item._id);
      if (existingItem) {
        // If already in cart, just increase quantity
        existingItem.quantity += 1;
      } else {
        // New item – set quantity to 1
        state.push({ ...item, quantity: 1 });
      }
    },
    decrement(state, action) {
      const id = action.payload;
      const existingItem = state.find((x) => x._id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Remove item when quantity becomes 0
          const index = state.indexOf(existingItem);
          state.splice(index, 1);
        }
      }
    },
    remove(state, action) {
      const index = state.findIndex((x) => x._id === action.payload);
      if (index > -1) state.splice(index, 1);
    },
    reset(state) {
      state.splice(0, state.length);
    },
  },
});

export const { increment, decrement, remove, reset } = CartSlice.actions;
export default CartSlice.reducer;