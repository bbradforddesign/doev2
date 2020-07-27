import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, authSelector } from "./slices/auth";
import {
  fetchMonthly,
  fetchAll,
  transactionsSelector,
} from "./slices/transactions";
import { uiSelector } from "./slices/ui";
import { fetchGoals } from "./slices/goals";

import {
  Container,
  Button,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Logout from "./components/Login/Logout";
import LoginForm from "./components/Forms/LoginForm";
import TransactionForm from "./components/Forms/TransactionForm";
import GoalForm from "./components/Forms/GoalForm";
import LineGraph from "./components/Graphs/LineGraph";
import Breakdown from "./components/Pages/Breakdown";
import Record from "./components/Record";
import MonthNav from "./components/Sidebar/MonthNav";

const App = () => {
  const dispatch = useDispatch();

  // is the user logged in?
  const auth = useSelector(authSelector);
  // fetch data on mount/update when actions dispatched
  const { monthly, responseCode } = useSelector(transactionsSelector);
  const active = useSelector(uiSelector);

  // logout the user after two hours
  setTimeout(() => {
    dispatch(logoutUser);
  }, 1000 * 60 * 120);

  // bottom nav state
  const [value, setValue] = useState(0);

  // on mount, fetch transactions to render
  useEffect(() => {
    if (auth.loggedIn === true) {
      dispatch(fetchMonthly(active.month));
      dispatch(fetchGoals());
      dispatch(fetchAll());
    }
  }, [dispatch, auth, active.month]);

  // styling and breakpoints
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      marginBottom: "2px",
      justifyContent: "space-between",
      width: "100%",
      height: "80vh",
      flexDirection: "row",
    },
  }));

  const classes = useStyles();

  const protectedContent = () => {
    if (responseCode !== 200) {
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "80vh",
          }}
        >
          {responseCode !== 200 ? (
            <h1>Error {responseCode} :(</h1>
          ) : (
            <h1>Redirecting...</h1>
          )}
          {responseCode === 400 ? (
            <p>Your session has expired. Please log out and sign back in.</p>
          ) : (
            <p>
              An error has occurred with our system. Please try again later!
            </p>
          )}
        </Box>
      );
    }
    return (
      <>
        {monthly && (
          <>
            <div>
              <div className={classes.root}>
                <MonthNav />
                <Switch>
                  <Route path="/current">
                    <Breakdown />
                  </Route>
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
                  <Route path="/trends">
                    <LineGraph />
                  </Route>
                  <Route path="/record">
                    <Record />
                  </Route>
                </Switch>
              </div>
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                showLabels
                style={{
                  alignSelf: "flex-end",
                  justifySelf: "center",
                }}
              >
                <BottomNavigationAction
                  label="Record"
                  component={Link}
                  to="/record"
                />
                <BottomNavigationAction
                  label="Current"
                  component={Link}
                  to="/current"
                />
                <BottomNavigationAction
                  label="Trends"
                  component={Link}
                  to="/trends"
                />
              </BottomNavigation>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <Router>
      <Container>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Doe</h1>
          {auth.loggedIn ? (
            <>
              <Logout />
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>Login</Button>
            </Link>
          )}
        </Box>

        <Route path="/login">
          <LoginForm />
        </Route>

        {auth.loggedIn ? protectedContent() : <Redirect to="/login" />}
      </Container>
    </Router>
  );
};

export default App;
