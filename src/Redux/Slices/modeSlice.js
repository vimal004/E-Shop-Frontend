import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "modeSlice",
  initialState: false,
  reducers: {
    toggleMode: (state) => {
      return !state;
    },
  },
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
