import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, authSelector } from "./slices/auth";

// component imports
import { Container, Button } from "@material-ui/core";
import Logout from "./components/Login/Logout";
import LoginForm from "./components/Forms/LoginForm";
import Main from "./components/Main";
import TransactionForm from "./components/Forms/TransactionForm";
import GoalForm from "./components/Forms/GoalForm";

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
      <Container>
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
          </div>
          {auth.loggedIn ? (
            <>
              <Logout />
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>Login</Button>
            </Link>
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
