import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
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