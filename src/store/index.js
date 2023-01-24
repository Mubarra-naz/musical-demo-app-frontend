import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./authSlice";
import tracksReducer from "./tracksSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    track: tracksReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
