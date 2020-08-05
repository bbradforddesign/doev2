import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { goalsSelector } from "../../slices/goals";
import { transactionsSelector } from "../../slices/transactions";
import { uiSelector } from "../../slices/ui";
import CompoundBar from "../Graphs/CompoundBar";
import PieChart from "../Graphs/PieChart";
import LineGraph from "../Graphs/LineGraph";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "80vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
      overflow: "hidden",
      overflowY: "scroll",
    },
  },
  content: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  block: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      height: "100%",
    },
  },
  tile: {
    margin: "0 0 3%",
    padding: "2% 0",
    width: "95%",
    maxWidth: "400px",
  },
}));

const Breakdown = () => {
  const classes = useStyles();

  const transactionState = useSelector(transactionsSelector);
  const goalState = useSelector(goalsSelector);

  const totals = transactionState.categoryTotals;

  const active = useSelector(uiSelector);

  return (
    <Box className={classes.root}>
      {
        // assert that data exists for graphs. otherwise, display message
        totals.All > 0 ? (
          <Box className={classes.content}>
            <Box style={{ margin: "10% 0" }}>
              <Typography variant="h2" align="center">
                Data Breakdown
              </Typography>
              <Typography variant="h4" align="center">
                Total Spent: ${Number.parseFloat(totals.All).toFixed(2)}
              </Typography>
            </Box>
            <Paper className={classes.tile}>
              <PieChart totals={totals} />
            </Paper>
            <Box className={classes.block}>
              <Paper className={classes.tile}>
                <CompoundBar
                  goalState={goalState}
                  totals={totals}
                  month={active.month}
                />
              </Paper>
              <Paper className={classes.tile}>
                <LineGraph />
              </Paper>
            </Box>
          </Box>
        ) : (
          <Typography variant="h2">No transactions recorded.</Typography>
        )
      }
    </Box>
  );
};

export default Breakdown;
