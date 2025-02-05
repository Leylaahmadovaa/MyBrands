import { createSlice } from "@reduxjs/toolkit";

// Updated = [
import Cookies from "universal-cookie";
const cookies = new Cookies();
const accessToken = cookies.get("JWT_token");
const initialState = { 
    isLogged: !!accessToken, 
    access: accessToken || "", 
    refresh: "" 
};
// ]

// const initialState = { isLogged: false, access: "", refresh: "" };
const authStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.access = action.payload.access;
      state.refresh=action.payload.refresh
    },
    logout: (state) => {
      state.isLogged = false;
      state.access=""
      state.refresh=""
    },
  },
});
export default authStore.reducer;
export const authAction = authStore.actions;
