import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  fetchTransactionsInRange,
  transactionsSelector,
} from "../slices/transactions";
import { setActive, sidebarSelector } from "../slices/sidebar";
import { fetchGoals, goalsSelector } from "../slices/goals";
import { authSelector } from "../slices/auth";
import { Button, ButtonGroup, Box, Paper } from "@material-ui/core";
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
    width: "20%",
    padding: "2%",
  },
});

const Main = () => {
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const {
    transactions,
    loadingTransactions,
    hasErrorsTransactions,
  } = useSelector(transactionsSelector);
  const active = useSelector(sidebarSelector);
  const { goals, loading, hasErrors } = useSelector(goalsSelector);
  const auth = useSelector(authSelector);

  // on mount, fetch transactions to render. Need to add date filter
  useEffect(() => {
    if (auth.loggedIn === true) {
      dispatch(fetchTransactions());
      dispatch(fetchGoals());
    }
  }, [dispatch, auth]);

  const renderTransactions = () => {
    if (loadingTransactions) return <p>Loading Transactions</p>;
    if (hasErrorsTransactions) return <p>Unable to Retrieve Transactions</p>;
    if (loading) return <p>Loading Goals</p>;
    if (hasErrors) return <p>Unable to Retrieve Goals</p>;

    return (
      <>
        {transactions && (
          <Box className={classes.contentBox}>
            <Paper className={classes.sidebar}>
              {active.active === "transactions" ? (
                // should filter by current month
                <TransactionBar transactions={transactions} />
              ) : (
                <GoalBar goals={goals} />
              )}
              <ButtonGroup
                style={{
                  width: "90%",
                  margin: "0 5%",
                }}
              >
                <Button
                  variant={
                    active.active === "transactions" ? "contained" : "outlined"
                  }
                  onClick={() => dispatch(setActive("transactions"))}
                >
                  Transactions
                </Button>
                <Button
                  variant={active.active === "goals" ? "contained" : "outlined"}
                  onClick={() => dispatch(setActive("goals"))}
                >
                  Goals
                </Button>
              </ButtonGroup>
            </Paper>
            <Paper style={{ height: "100%", width: "40%" }}>
              <PieChart />
              <LineGraph />
            </Paper>
            <CompoundBar />
          </Box>
        )}
      </>
    );
  };

  return <>{auth.loggedIn ? renderTransactions() : <p>Please log in.</p>}</>;
};

export default Main;
