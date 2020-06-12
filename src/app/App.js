import React from "react";
import "./App.css";

// component imports
import Login from "./components/Login";
import Transactions from "./components/Transactions";

const App = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 5vw 0 5vw",
        }}
      >
        <h1 style={{ flex: "1" }}>Hello, App</h1>
        <Login />
      </div>
      <div>
        <Transactions />
      </div>
    </div>
  );
};

export default App;
