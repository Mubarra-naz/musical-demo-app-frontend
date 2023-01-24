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
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload.data;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.tracks = [];
      });
  },
});

export default tracksSlice.reducer;
