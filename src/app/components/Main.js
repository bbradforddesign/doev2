import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonthly,
  fetchAll,
  transactionsSelector,
} from "../slices/transactions";
import { setSidebar, setGraph, uiSelector } from "../slices/ui";
import { fetchGoals, goalsSelector } from "../slices/goals";
import { authSelector } from "../slices/auth";
import { Button, ButtonGroup, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TransactionBar from "./Sidebar/TransactionBar";
import GoalBar from "./Sidebar/GoalBar";

import moment from "moment";

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
    width: "40vw",
    margin: "0 5%",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleGroup: {
    marginTop: "5%",
  },
});

const Main = () => {
  const [month, setMonth] = useState(moment());

  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const { monthly, loadingTransactions, hasErrorsTransactions } = useSelector(
    transactionsSelector
  );
  const active = useSelector(uiSelector);
  const { goals, loading, hasErrors } = useSelector(goalsSelector);
  const auth = useSelector(authSelector);

  // on mount, fetch transactions to render
  useEffect(() => {
    if (auth.loggedIn === true) {
      dispatch(fetchMonthly(month));
      dispatch(fetchGoals());
      dispatch(fetchAll());
    }
  }, [dispatch, auth, month]);

  const renderTransactions = () => {
    if (loadingTransactions) return <p>Loading Transactions</p>;
    if (hasErrorsTransactions) return <p>Unable to Retrieve Transactions</p>;
    if (loading) return <p>Loading Goals</p>;
    if (hasErrors) return <p>Unable to Retrieve Goals</p>;

    return (
      <>
        {monthly && (
          <Box className={classes.contentBox}>
            <Paper className={classes.sidebar}>
              {active.sidebar === "transactions" ? (
                // should filter by current month
                <TransactionBar
                  transactions={monthly}
                  month={month.format("MM/YYYY")}
                />
              ) : (
                <GoalBar goals={goals} />
              )}
              <ButtonGroup className={classes.toggleGroup}>
                <Button
                  variant={
                    active.active === "transactions" ? "contained" : "outlined"
                  }
                  onClick={() => dispatch(setSidebar("transactions"))}
                >
                  Transactions
                </Button>
                <Button
                  variant={active.active === "goals" ? "contained" : "outlined"}
                  onClick={() => dispatch(setSidebar("goals"))}
                >
                  Goals
                </Button>
              </ButtonGroup>
            </Paper>
            <Paper className={classes.graphBox}>
              {active.graph === "pie" ? <PieChart /> : <LineGraph />}
              <ButtonGroup className={classes.toggleGroup}>
                <Button onClick={() => dispatch(setGraph("pie"))}>
                  Current
                </Button>
                <Button onClick={() => dispatch(setGraph("line"))}>
                  Trends
                </Button>
              </ButtonGroup>
            </Paper>
            <CompoundBar month={month} />
            <Button
              onClick={() => setMonth(moment(month).subtract(1, "months"))}
            >
              Back
            </Button>
            <Button onClick={() => setMonth(moment())}>Current</Button>
            <Button onClick={() => setMonth(moment(month).add(1, "months"))}>
              Forward
            </Button>
          </Box>
        )}
      </>
    );
  };

  return <>{auth.loggedIn ? renderTransactions() : <p>Please log in.</p>}</>;
};

export default Main;
