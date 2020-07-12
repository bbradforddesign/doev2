import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, authSelector } from "./slices/auth";

// component imports
import { Container } from "@material-ui/core";
import Logout from "./components/Login/Logout";
import LoginForm from "./components/Login/LoginForm";
import Main from "./components/Main";
import TransactionForm from "./components/Transactions/TransactionForm";
import GoalForm from "./components/Goals/GoalForm";

const App = () => {
  const dispatch = useDispatch();

  // is the user logged in?
  const auth = useSelector(authSelector);

  // logout the user after two hours
  setTimeout(() => {
    dispatch(logoutUser);
  }, 1000 * 60 * 120);

  return (
    <Router>
      <Container style={{ backgroundColor: "#F6F6F6" }}>
        <nav
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ flex: 1 }}>
            <h1>Doe</h1>
            <h3>
              <em>Save Bucks, Use Doe</em>
            </h3>
          </div>
          {auth.loggedIn ? (
            <>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "row",
                  listStyle: "none",
                  flex: 1,
                }}
              >
                <li>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/main" style={{ textDecoration: "none" }}>
                    Main
                  </Link>
                </li>
              </ul>
              <Logout />
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
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
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/main" render={(props) => <Main {...props} />} />
              <Route path="/transaction/new">
                <TransactionForm />
              </Route>
              <Route
                path="/transaction/edit"
                render={(props) => <TransactionForm {...props} />}
              />
              <Route path="/goal/new">
                <GoalForm />
              </Route>
              <Route
                path="/goal/edit"
                render={(props) => <GoalForm {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Container>
    </Router>
  );
};

export default App;
