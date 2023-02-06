import { createAsyncThunk } from "@reduxjs/toolkit";
import { showNotification } from "../../store/uiSlice";
import AppSetting from "../../config";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (values, thunkApi) => {
    try {
      const response = await axios.post(
        `${AppSetting.API_URL}/users`,
        JSON.stringify({
          user: {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            password_confirmation: values.confirmPassword,
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      thunkApi.dispatch(
        showNotification({
          status: "success",
          title: "Success",
          message: "Signed up successfully",
        })
      );
      return response.data;
    } catch (error) {
      let msg;
      if (!error.response) {
        msg = "No server response";
      } else if (error.response.status === 422) {
        msg = error.response.data.error;
      } else {
        msg = "Registration Failed";
      }
      thunkApi.dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: msg,
        })
      );
      return thunkApi.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await axios.post(
        `${AppSetting.API_URL}/users/sign_in`,
        JSON.stringify(credentials),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      thunkApi.dispatch(
        showNotification({
          status: "success",
          title: "Success",
          message: "Logged in successfully",
        })
      );
      return response.data;
    } catch (error) {
      let msg;
      if (!error?.response) {
        msg = "No server response";
      } else if (error.response?.status === 401) {
        msg = "Invalid Email or Password";
      } else {
        msg = "Login Failed";
      }
      thunkApi.dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: msg,
        })
      );
      return thunkApi.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, thunkApi) => {
    try {
      const response = await axios.delete(
        `${AppSetting.API_URL}/users/sign_out`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkApi.dispatch(
        showNotification({
          status: "success",
          title: "Success",
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      let msg;
      if (!error?.response) {
        msg = "No server response";
      } else if (error.response?.status === 401) {
        msg = error.response.data.error;
      } else {
        msg = "Logout Failed";
      }
      thunkApi.dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: msg,
        })
      );
      return thunkApi.rejectWithValue();
    }
  }
);
