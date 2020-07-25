import React from "react";
import { useSelector } from "react-redux";
import { goalsSelector } from "../../slices/goals";
import { transactionsSelector } from "../../slices/transactions";
import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

// styling and breakpoints
const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    padding: "2%",
    height: "60vh",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "80%",
    },
  },
}));

const GoalProgress = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "2vh",
        width: "100%",
        boxShadow: "2px 2px 4px #CCC",
      }}
    >
      <div
        style={{
          backgroundColor:
            props.max <= props.current
              ? "rgba(225,125,125)"
              : "rgba(125,225,125)",
          flex: props.current,
        }}
      />
      <div
        className="growBar"
        style={{
          backgroundColor: "#f0f0f0",
          flex: props.max >= props.current ? props.max - props.current : 0,
        }}
      />
    </div>
  );
};

const CompoundBar = () => {
  // pull goals from redux store
  const goalState = useSelector(goalsSelector);
  const totals = goalState.totals;
  // pull transactions to determine goal progress
  const transactionState = useSelector(transactionsSelector);
  const currentTotal = transactionState.categoryTotals;

  const bars = [];

  for (const [key, value] of Object.entries(totals)) {
    if (key !== "All") {
      bars.push({ category: key, amount: value });
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">Progress</Typography>

      <ul
        style={{
          padding: 0,
          listStyle: "none",
          width: "100%",
          height: "80%",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {bars.map((e) => (
          <li key={e.category} style={{ margin: "2% 2% 0 0" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">{e.category}</Typography>
              <Typography variant="subtitle1" style={{ alignSelf: "flex-end" }}>
                ${currentTotal[e.category] ? currentTotal[e.category] : 0} / $
                {e.amount} Spent
              </Typography>
            </div>
            <GoalProgress
              max={e.amount}
              current={currentTotal[e.category] ? currentTotal[e.category] : 0}
              label={e.label}
            />
          </li>
        ))}
      </ul>
      <Typography variant="h5">
        Total Spent: ${Number.parseFloat(currentTotal.All).toFixed(2)}
      </Typography>
    </div>
  );
};

export default CompoundBar;
