import { createSlice } from "@reduxjs/toolkit";
import { fetchTracks } from "./actions/trackActions";
import { showNotification } from "./uiSlice";

const tracksSlice = createSlice({
  name: "track",
  initialState: {
    tracks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        showNotification({
          status: "pending",
          title: "Loading...",
          message: "",
        });
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload.data;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.tracks = [];
        showNotification({
          status: "error",
          title: "Error",
          message: action.error.message,
        });
      });
  },
});

export default tracksSlice.reducer;
