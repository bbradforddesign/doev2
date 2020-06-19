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
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Switch style={{ flex: 6 }}>
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
          <nav style={{ flex: 1 }}>
            <h1 style={{ flex: "1" }}>Hello, App</h1>
            <Login />
            <ul>
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
          </nav>
        </div>
      </div>
    </Router>
  );
};

export default App;
