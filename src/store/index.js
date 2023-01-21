import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
