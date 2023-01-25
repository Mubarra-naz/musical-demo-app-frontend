import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTracks,
  markFavourite,
  removeFavourite,
} from "./actions/trackActions";

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
      })
      .addCase(markFavourite.fulfilled, (state, action) => {
        const track = state.tracks.find(
          (item) => item.id == action.payload.track_id
        );
        track.attributes.is_favourite = true;
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        const track = state.tracks.find(
          (item) => item.id == action.payload.track_id
        );
        track.attributes.is_favourite = false;
      });
  },
});

export default tracksSlice.reducer;
