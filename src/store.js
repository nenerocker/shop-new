import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./reducers/itemSlice";
import { useReducer } from "react";
import reducer from "./reducers/itemSlice";

const rootReducer ={
  cart: useReducer
}

export const store = configureStore({
  reducer: {
    item: itemSlice,
    reducer: rootReducer
  },
});
export default store;