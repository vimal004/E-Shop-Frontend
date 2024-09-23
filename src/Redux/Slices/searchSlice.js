import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: { text: "" },
  reducers: {
    setsearch: (state, action) => {
      state.text = action.payload;
      console.log(state.text);
    },
  },
});

export const { setsearch } = searchSlice.actions;
export default searchSlice.reducer;
