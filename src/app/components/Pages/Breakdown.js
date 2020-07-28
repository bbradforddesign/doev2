import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { goalsSelector } from "../../slices/goals";
import { transactionsSelector } from "../../slices/transactions";
import { uiSelector } from "../../slices/ui";
import CompoundBar from "../Graphs/CompoundBar";
import PieChart from "../Graphs/PieChart";

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
    [theme.breakpoints.up("md")]: {
      paddingRight: "10%",
    },
  },
  content: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "45%",
    },
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
      <Typography variant="h3" align="center">
        Category Breakdown
      </Typography>
      {
        // assert that data exists for graphs. otherwise, display message
        totals.All > 0 ? (
          <>
            <PieChart totals={totals} />
            <div className={classes.content}>
              <CompoundBar
                goalState={goalState}
                totals={totals}
                month={active.month}
              />
            </div>
          </>
        ) : (
          <Typography variant="h2">No transactions recorded.</Typography>
        )
      }
    </Box>
  );
};

export default Breakdown;
