import React, { useState } from "react";

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });

  // backend app's url
  const baseUrl = "http://localhost:3001/api/v1";

  const fetchUser = async () => {
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
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchUser();
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
    </div>
  );
};

export default Login;
