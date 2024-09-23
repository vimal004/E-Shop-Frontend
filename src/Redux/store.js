import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./Slices/modeSlice";
import userSlice from "./Slices/userSlice";
import searchSlice from "./Slices/searchSlice";

const store = configureStore({
  reducer: {
    mode: modeSlice,
    user: userSlice,
    search: searchSlice,
  },
});

export default store;
