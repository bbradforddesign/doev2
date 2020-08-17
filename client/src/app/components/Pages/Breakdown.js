import React, { useEffect, useState } from "react";
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
      justifyContent: "flex-start",
      width: "100%",
      overflow: "hidden",
      overflowY: "scroll",
    },
  },
  content: {
    display: "flex",
    alignItems: "center",
    width: "100%",
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
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  blockPie: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "40%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  tile: {
    margin: "0 0 2%",
    padding: "2% 0",
    width: "95%",
    maxWidth: "400px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10%",
    },
  },
  message: {
    display: "flex",
    alignItems: "center",
    height: "70%",
    width: "70%",
    margin: "10% 0",
    padding: "0 5%",
    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
  },
}));

const Breakdown = () => {
  const [months, setMonths] = useState([]);

  const classes = useStyles();

  const transactionState = useSelector(transactionsSelector);
  const goalState = useSelector(goalsSelector);

  const totals = transactionState.categoryTotals;
  const monthlyTotals = transactionState.monthlyTotals;

  useEffect(() => {
    for (const month in monthlyTotals) {
      setMonths((months) => [...months, monthlyTotals[month]]);
    }
    console.log(months);
  }, [monthlyTotals]);

  const active = useSelector(uiSelector);

  return (
    <Box className={classes.root}>
      {
        // assert that data exists for graphs. otherwise, display message
        totals.All > 0 ? (
          <Box className={classes.content}>
            <Box className={classes.block}>
              <Typography variant="h2" align="center">
                Spending Breakdown
              </Typography>
              <div style={{ margin: "5% 0 10%" }}>
                <Typography align="right">
                  Monthly total: ${Number.parseFloat(totals.All).toFixed(2)}
                </Typography>
                {months.length > 0 && (
                  <Typography align="right">
                    Average month: $
                    {Number.parseFloat(
                      months.reduce((i, e) => i + e) / months.length
                    ).toFixed(2)}
                  </Typography>
                )}
              </div>
            </Box>
            <Box className={classes.blockPie}>
              <Paper className={classes.tile}>
                <PieChart totals={totals} />
              </Paper>
            </Box>
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
          <>
            <Typography variant="h2" align="center" color="textPrimary">
              Spending Breakdown
            </Typography>
            <Paper className={classes.message}>
              <Typography variant="subtitle1">
                This month doesn't have any expenses on record. Record
                transactions for this month to receive insights!
              </Typography>
            </Paper>
          </>
        )
      }
    </Box>
  );
};

export default Breakdown;
