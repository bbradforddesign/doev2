import { createSlice } from "@reduxjs/toolkit";

const SERVER = process.env.REACT_APP_BACKEND_URL;

export const initialState = {
  loggedIn: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.loggedIn = true;
    },
    removeAuth: (state) => {
      state.loggedIn = false;
    },
    loadMessage: (state, { payload }) => {
      state.message = payload;
    },
  },
});

export const { setAuth, removeAuth, loadMessage } = authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;

export function loginUser(u, p) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${SERVER}/api/v1/users/login`, {
        method: "post",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          username: u,
          password: p,
        }),
      });
      if (response.status === 200) {
        dispatch(setAuth());
        dispatch(loadMessage(""));
      } else {
        dispatch(loadMessage("Invalid username/password"));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      await fetch(`${SERVER}/api/v1/users/logout`, {
        method: "get",
        credentials: "include",
      });
      dispatch(removeAuth());
    } catch (error) {
      console.log(error);
    }
  };
}

export function registerUser(u, p) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${SERVER}/api/v1/users`, {
        method: "post",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          username: u,
          password: p,
        }),
      });
      if (response.status >= 200 && response.status <= 300) {
        dispatch(setAuth());
        dispatch(loadMessage(""));
      } else {
        dispatch(loadMessage("Username taken"));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
