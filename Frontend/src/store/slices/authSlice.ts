import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Action {
 payload: { user: any; token: string; isAuthenticated: boolean; } 

}

interface State {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSclice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: State, action: Action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user")
    },
  },
}); 



export const {setCredentials, logout} = authSclice.actions;
export default authSclice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
