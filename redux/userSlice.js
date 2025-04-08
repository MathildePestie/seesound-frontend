import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  firstname: null,
  lastname: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    logoutUser: (state) => {
      state.token = null;
      state.username = null;
      state.firstname = null;
      state.lastname = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
