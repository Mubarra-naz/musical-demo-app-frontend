import { createAsyncThunk } from "@reduxjs/toolkit";
import AppSetting from "../../config";
import axios from "axios";

const setHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const fetchTracks = createAsyncThunk("tracks/fetchTracks", async () => {
  try {
    const response = await axios.get(
      `${AppSetting.API_URL}/api/v1/tracks`,
      setHeaders()
    );
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
  try {
    const response = await axios.get(
      `${AppSetting.API_URL}/api/v1/tracks/${audioId}/download`,
      setHeaders()
    );
    const url = response.data.url;
    return { url };
  } catch (error) {
    let message;
    if (!error?.response) {
      message = "No server response";
    } else if (error.response.status === 401) {
      message = error.response.data;
    } else {
      message = error.response.data.error;
    }
    throw new Error(message);
  }
};

export const markFavourite = createAsyncThunk(
  "track/markFavourite",
  async (audioId) => {
    try {
      const response = await axios.post(
        `${AppSetting.API_URL}/api/v1/add_favourtie`,
        JSON.stringify({ track_id: audioId }),
        setHeaders()
      );
      return response.data;
    } catch (error) {
      let message;
      if (!error?.response) {
        message = "No server response";
      } else if (error.response.status === 401) {
        message = error.response.data;
      } else {
        message = error.response.data.message;
      }
      throw new Error(message);
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "track/removeFavourite",
  async (audioId) => {
    try {
      const response = await axios.delete(
        `${AppSetting.API_URL}/api/v1/remove_favourtie/${audioId}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      let message;
      if (!error?.response) {
        message = "No server response";
      } else if (error.response.status === 401) {
        message = error.response.data;
      } else {
        message = error.response.data.message;
      }
      throw new Error(message);
    }
  }
);
