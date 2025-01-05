import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    profile:null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    profile:(state,action)=>{
state.profile=action.payload;
    },
  },
});

export const { login ,logout,profile} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;  