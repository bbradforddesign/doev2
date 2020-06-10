import React, { useState } from "react";

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });

  // backend app's url
  const baseUrl = "http://localhost:3001/api/v1";

  const handleLogin = async () => {
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
    window.location.reload();
  };

  const handleLogout = async () => {
    await fetch(`${baseUrl}/users/logout`, {
      method: "get",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    window.location.reload();
  };

  const handleCreds = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input type="text" name="email" onChange={handleCreds} />
      <input type="text" name="password" onChange={handleCreds} />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
