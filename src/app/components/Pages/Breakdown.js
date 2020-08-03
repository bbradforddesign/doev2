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
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
      overflow: "hidden",
      overflowY: "scroll",
    },
  },
  content: {
    display: "flex",

    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  tile: {
    margin: "2%",
    padding: "2% 0",
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
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "80%",
              }}
            >
              <Typography variant="h2" align="center">
                Category Breakdown
              </Typography>
              <Typography variant="h4" align="center">
                Total Spent: ${Number.parseFloat(totals.All).toFixed(2)}
              </Typography>
              <Paper>
                <PieChart totals={totals} />
              </Paper>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                width: "inherit",
              }}
            >
              <Paper
                style={{ width: "90%", maxWidth: "400px", margin: "5% 0" }}
              >
                <CompoundBar
                  goalState={goalState}
                  totals={totals}
                  month={active.month}
                />
              </Paper>
              <Paper style={{ width: "90%", marginBottom: "5%" }}>
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
