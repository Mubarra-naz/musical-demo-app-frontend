import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui-slice",
  initialState: {
    notification: null,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const { showNotification } = uiSlice.actions;
export default uiSlice.reducer;
