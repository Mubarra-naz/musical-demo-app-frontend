import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./actions/authActions";

const clearCredentials = (state) => {
  state.token = null;
  state.isLoggedIn = false;
  state.isSignedUp = false;
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedUp: false,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("expiresIn", payload.expiresIn);
    },
    [login.rejected]: (state, { payload }) => {
      clearCredentials(state);
    },
    [logout.fulfilled]: (state, { payload }) => {
      clearCredentials(state);
    },
    [register.fulfilled]: (state, { payload }) => {
      state.isSignedUp = true;
    },
    [register.rejected]: (state, { payload }) => {
      state.isSignedUp = false;
    },
  },
});

export default authSlice.reducer;
