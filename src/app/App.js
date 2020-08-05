import React, { useEffect } from "react";
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
  Typography,
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme/Theme";

import Logout from "./components/Login/Logout";
import LoginForm from "./components/Forms/LoginForm";
import TransactionForm from "./components/Forms/TransactionForm";
import GoalForm from "./components/Forms/GoalForm";
import Breakdown from "./components/Pages/Breakdown";
import MonthNav from "./components/Sidebar/MonthNav";
import GoalBar from "./components/Sidebar/GoalBar";
import TransactionBar from "./components/Sidebar/TransactionBar";

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
      width: "100%",
      height: "94vh",
      flexDirection: "column",
    },
    bottomNav: {
      backgroundColor: "rgba(150,200,240,1)",
      alignSelf: "flex-end",
      justifySelf: "center",
      width: "100%",
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
                  <Route path="/transaction">
                    <TransactionBar />
                  </Route>
                  <Route path="/goal">
                    <GoalBar />
                  </Route>
                  <Route path="/breakdown">
                    <Breakdown />
                  </Route>
                  <Route path="/create/transaction">
                    <TransactionForm />
                  </Route>
                  <Route
                    path="/edit/transaction"
                    render={(props) => <TransactionForm {...props} />}
                  />
                  <Route path="/create/goal">
                    <GoalForm />
                  </Route>
                  <Route
                    path="/edit/goal"
                    render={(props) => <GoalForm {...props} />}
                  />
                </Switch>
              </div>
              <BottomNavigation showLabels className={classes.bottomNav}>
                <BottomNavigationAction
                  label="Transactions"
                  component={Link}
                  to="/transaction"
                />
                <BottomNavigationAction
                  label="Categories"
                  component={Link}
                  to="/goal"
                />
                <BottomNavigationAction
                  label="Breakdown"
                  component={Link}
                  to="/breakdown"
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
      <ThemeProvider theme={theme}>
        <Container>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "8vh",
              width: "90%",
            }}
          >
            <Typography variant="h1">Doe</Typography>
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
      </ThemeProvider>
    </Router>
  );
};

export default App;
