import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, authSelector } from "./slices/auth";
import {
  fetchMonthly,
  fetchAll,
  transactionsSelector,
} from "./slices/transactions";
import { uiSelector } from "./slices/ui";
import { fetchGoals, goalsSelector } from "./slices/goals";

// material-ui imports
import {
  Container,
  Button,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import PieChartIcon from "@material-ui/icons/PieChart";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme/Theme";

// button that clears auth and redirects to login
import Logout from "./components/Login/Logout";

// forms
import LoginForm from "./components/Forms/LoginForm";
import TransactionForm from "./components/Forms/TransactionForm";
import GoalForm from "./components/Forms/GoalForm";

// persistent navbar
import MonthNav from "./components/Sidebar/MonthNav";

// page bodies for react-router
import ListBody from "./components/Pages/ListBody";
import Breakdown from "./components/Pages/Breakdown";

const App = () => {
  const dispatch = useDispatch();

  // is the user logged in?
  const auth = useSelector(authSelector);

  // fetch data on mount/update when actions dispatched
  const { monthly, hasErrorsTransactions } = useSelector(transactionsSelector);
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
      height: "93vh",
      flexDirection: "column",
    },
    bottomNav: {
      alignSelf: "flex-end",
      justifySelf: "center",
      width: "100%",
    },
  }));

  const classes = useStyles();

  // only render if logged in successfully. otherwise, display message
  const protectedContent = () => {
    if (hasErrorsTransactions) {
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
          <Typography variant="body1">
            An error has occurred with our system. Please try again later!
          </Typography>
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
                    <ListBody
                      selector={transactionsSelector}
                      type="transaction"
                    />
                  </Route>
                  <Route path="/goal">
                    <ListBody selector={goalsSelector} type="goal" />
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
                  icon={<CreateIcon />}
                  component={Link}
                  to="/transaction"
                />
                <BottomNavigationAction
                  label="Goals"
                  icon={<TrackChangesIcon />}
                  component={Link}
                  to="/goal"
                />
                <BottomNavigationAction
                  label="Breakdown"
                  icon={<PieChartIcon />}
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
              flexDirection: "row-reverse",
              alignItems: "center",
              height: "8vh",
              width: "100%",
            }}
          >
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
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoginForm />
            </Box>
          </Route>

          {auth.loggedIn ? protectedContent() : <Redirect to="/login" />}
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
