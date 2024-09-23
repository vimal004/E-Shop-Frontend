import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    clickstate: false,
    loggedstate: false,
    user: [],
    address: null,
  },
  reducers: {
    toggleLoginModal: (state) => {
      return !state;
    },
    setLoggedIn: (state) => {
      return {
        ...state,
        loggedstate: true,
      };
    },
    setLoggedOut: (state) => {
      return {
        ...state,
        loggedstate: false,
      };
    },
    setUser: (state, action) => {
      state.user.push(action.payload);
      console.log(state.user);
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  toggleLoginModal,
  setLoggedIn,
  setLoggedOut,
  setUser,
  setAddress,
} = userSlice.actions;
export default userSlice.reducer;
