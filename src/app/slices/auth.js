import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.loggedIn = true;
    },
    reset: () => initialState,
  },
});

export const { setAuth, reset } = authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;

export function loginUser(e, p) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/users/login`, {
        method: "post",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: e,
          password: p,
        }),
      });
      if (response.status === 200) {
        dispatch(setAuth());
      } else {
        window.alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/api/v1/users/logout`, {
      method: "get",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    dispatch(reset());
  };
}

export function registerUser(e, p) {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/api/v1/users`, {
      method: "post",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: e,
        password: p,
      }),
    });
    dispatch(setAuth());
  };
}
