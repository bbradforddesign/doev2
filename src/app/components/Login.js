import React, { useState } from "react";

/**
 * Concerns:
 * If user stays logged in too long, and jwt expires, will we need to change localstorage?
 * Right now, i believe that the app will still believe that they're logged on, but they won't have their credentials to fetch anything. fix?
 */
const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });

  // backend app's url
  const baseUrl = "http://localhost:3001/api/v1";

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("authed", "true");
    await fetch(`${baseUrl}/users/login`, {
      method: "post",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: creds.email,
        password: creds.password,
      }),
    });
    window.location.reload(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.setItem("authed", "false");
    await fetch(`${baseUrl}/users/logout`, {
      method: "get",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    window.location.reload(false);
  };

  // creates new user in db. Automatically logs on with new jwt
  const handleRegister = async (e) => {
    e.preventDefault();
    localStorage.setItem("authed", "true");
    await fetch(`${baseUrl}/users`, {
      method: "post",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: creds.email,
        password: creds.password,
      }),
    });
    window.location.reload(false);
  };

  const handleCreds = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
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
      {localStorage.getItem("authed") === "false" ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <button onClick={handleRegister}>Register</button>
    </form>
  );
};

export default Login;
