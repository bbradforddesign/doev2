import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

// component imports
import Login from "./components/Login";
import Transactions from "./components/Transactions";
import Goals from "./components/Goals";

const App = () => {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgb(155,240,155)",
        }}
      >
        <h1 style={{ flex: 1 }}>Hello, App</h1>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            listStyle: "none",
            flex: 1,
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/goals">Goals</Link>
          </li>
        </ul>
        <Login />
      </nav>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Switch>
            <Route exact path="/">
              <div>
                <h2>Home</h2>
              </div>
            </Route>
            <Route path="/transactions">
              <div>
                <Transactions />
              </div>
            </Route>
            <Route path="/goals">
              <div>
                <Goals />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
