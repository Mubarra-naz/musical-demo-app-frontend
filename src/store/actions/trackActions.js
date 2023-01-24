import { createAsyncThunk } from "@reduxjs/toolkit";
import AppSetting from "../../config";
import axios from "axios";

export const fetchTracks = createAsyncThunk("tracks/fetchTracks", async () => {
  try {
    const response = await axios.get(`${AppSetting.API_URL}/api/v1/tracks`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    let msg;
    if (!error?.response) {
      msg = "No server response";
    } else {
      msg = error.response.data.error;
    }
    throw new Error(msg);
  }
});

export const fetchAudio = createAsyncThunk("tracks/fetchAudio", async (url) => {
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "audio/wav" },
    });
    return response.data;
  } catch (error) {
    let msg;
    if (!error?.response) {
      msg = "No server response";
    } else {
      msg = error.response.data.error;
    }
    throw new Error(msg);
  }
});

export const downloadAudio = async (audioId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${AppSetting.API_URL}/api/v1/tracks/${audioId}/download`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const url = response.data.url;
    return { url };
  } catch (error) {
    let msg;
    if (!error?.response) {
      msg = "No server response";
    } else if (error.response.status === 401) {
      msg = error.response.data;
    } else {
      msg = error.response.data.error;
    }
    throw new Error(msg);
  }
};
