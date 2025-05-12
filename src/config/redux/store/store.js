import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducer/cartSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Cart: cartSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Cart"], // only persist the Cart slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;