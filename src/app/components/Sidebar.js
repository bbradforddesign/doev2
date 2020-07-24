import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Paper, Button, ButtonGroup, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import TransactionBar from "./Sidebar/TransactionBar";
import GoalBar from "./Sidebar/GoalBar";
import { setSidebar, uiSelector } from "../slices/ui";
import { transactionsSelector, fetchMonthly } from "../slices/transactions";
import { goalsSelector, fetchGoals } from "../slices/goals";

const useStyles = makeStyles({
  sidebar: {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "280px",
    paddingTop: "2%",
  },
});

const Sidebar = () => {
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const { monthly } = useSelector(transactionsSelector);
  const { goals } = useSelector(goalsSelector);
  const active = useSelector(uiSelector);

  useEffect(() => {
    dispatch(fetchMonthly(active.month));
    dispatch(fetchGoals());
  }, [dispatch, active.month]);

  return (
    <Box className={classes.sidebar}>
      <Typography variant="h4" align="center">
        {active.sidebar.charAt(0).toUpperCase() + active.sidebar.slice(1)}
      </Typography>
      {active.sidebar === "transactions" ? (
        // should filter by current month
        <TransactionBar transactions={monthly} month={active.month} />
      ) : (
        <GoalBar goals={goals} />
      )}
      <Box>
        <ButtonGroup>
          <Button
            variant={
              active.sidebar === "transactions" ? "contained" : "outlined"
            }
            onClick={() => dispatch(setSidebar("transactions"))}
          >
            Transactions
          </Button>
          <Button
            variant={active.sidebar === "goals" ? "contained" : "outlined"}
            onClick={() => dispatch(setSidebar("goals"))}
          >
            Goals
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Sidebar;
