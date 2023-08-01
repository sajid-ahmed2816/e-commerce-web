import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    add(state, action) {
      const item = action.payload;
      const existingItem = state.find((x) => x.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push(action.payload);
      }
    },
    remove(state, action) {
      let i = state.findIndex((x) => x.id === action.payload);
      if (i > -1) {
        state.splice(i, 1);
      }
    },
  },
});

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;
