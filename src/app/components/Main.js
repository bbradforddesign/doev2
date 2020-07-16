import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  fetchMonthly,
  fetchAll,
  transactionsSelector,
} from "../slices/transactions";
import {
  setSidebar,
  setGraph,
  uiSelector,
  incMonth,
  decMonth,
  resetMonth,
} from "../slices/ui";
import { fetchGoals, goalsSelector } from "../slices/goals";
import { authSelector } from "../slices/auth";
import { Button, IconButton, ButtonGroup, Box, Paper } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReplayIcon from "@material-ui/icons/Replay";
import { makeStyles } from "@material-ui/core/styles";
import TransactionBar from "./Sidebar/TransactionBar";
import GoalBar from "./Sidebar/GoalBar";

import LineGraph from "./Graphs/LineGraph";
import PieChart from "./Graphs/PieChart";
import CompoundBar from "./Graphs/CompoundBar";

const useStyles = makeStyles({
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "90vw",
    height: "80vh",
  },
  sidebar: {
    width: "20vw",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  graphBox: {
    margin: "0 5%",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleGroup: {
    margin: "5%",
  },
});

const Main = () => {
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const {
    monthly,
    hasErrorsTransactions,
    loadingTransactions,
    responseCode,
  } = useSelector(transactionsSelector);
  const active = useSelector(uiSelector);
  const { goals, hasErrors } = useSelector(goalsSelector);
  const auth = useSelector(authSelector);

  // on mount, fetch transactions to render
  useEffect(() => {
    if (auth.loggedIn === true) {
      dispatch(fetchMonthly(active.month));
      dispatch(fetchGoals());
      dispatch(fetchAll());
    }
  }, [dispatch, auth, active.month]);

  const renderTransactions = () => {
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
          <h1>Error {responseCode} :(</h1>
          {responseCode === 400 ? (
            <p>
              Your session has expired. Please log out and sign back in to keep
              working!
            </p>
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
          <Box className={classes.contentBox}>
            <Paper className={classes.sidebar}>
              {active.sidebar === "transactions" ? (
                // should filter by current month
                <TransactionBar transactions={monthly} month={active.month} />
              ) : (
                <GoalBar goals={goals} />
              )}
              <ButtonGroup className={classes.toggleGroup}>
                <Button
                  variant={
                    active.sidebar === "transactions" ? "contained" : "outlined"
                  }
                  onClick={() => dispatch(setSidebar("transactions"))}
                >
                  Transactions
                </Button>
                <Button
                  variant={
                    active.sidebar === "goals" ? "contained" : "outlined"
                  }
                  onClick={() => dispatch(setSidebar("goals"))}
                >
                  Goals
                </Button>
              </ButtonGroup>
            </Paper>

            <Paper className={classes.graphBox}>
              {active.graph === "pie" ? (
                <PieChart month={active.month} />
              ) : (
                <LineGraph />
              )}
              <ButtonGroup className={classes.toggleGroup}>
                <Button onClick={() => dispatch(setGraph("pie"))}>
                  Current
                </Button>
                <Button onClick={() => dispatch(setGraph("line"))}>
                  Trends
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <IconButton onClick={() => dispatch(decMonth(active.month))}>
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => dispatch(resetMonth())}>
                  <ReplayIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => dispatch(incMonth(active.month))}>
                  <ArrowForwardIcon fontSize="large" />
                </IconButton>
              </ButtonGroup>
            </Paper>
            <CompoundBar month={active.month} />
          </Box>
        )}
      </>
    );
  };

  return <>{auth.loggedIn ? renderTransactions() : <Redirect to="/login" />}</>;
};

export default Main;
