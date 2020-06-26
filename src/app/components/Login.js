import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  registerUser,
  authSelector,
} from "../slices/auth";

const Login = () => {
  // moving auth from localstorage to redux
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const [creds, setCreds] = useState({ email: "", password: "" });

  const handleLogin = () => {
    dispatch(loginUser(creds.email, creds.password));
    console.log(auth);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // creates new user in db. Automatically logs on with new jwt
  const handleRegister = () => {
    dispatch(registerUser(creds.email, creds.password));
  };

  const handleCreds = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        autoComplete="username"
        onChange={handleCreds}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        autoComplete="new-password"
        onChange={handleCreds}
      />
      {auth.loggedIn ? (
        <button onClick={() => handleLogout()}>Logout</button>
      ) : (
        <>
          {" "}
          <button onClick={() => handleLogin()}>Login</button>{" "}
          <button onClick={() => handleRegister()}>Register</button>
        </>
      )}
    </div>
  );
};

export default Login;
