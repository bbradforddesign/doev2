import React from "react";
import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

// styling and breakpoints
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 5%",
    [theme.breakpoints.down("sm")]: {
      height: "90%",
    },
    [theme.breakpoints.up("md")]: {
      height: "35vh",
    },
  },
  scrollList: {
    padding: 0,
    height: "100%",
    listStyle: "none",
    [theme.breakpoints.up("md")]: {
      overflow: "hidden",
      overflowY: "scroll",
    },
  },
}));

const GoalProgress = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "8px",
        width: "100%",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          backgroundColor:
            props.max <= props.current ? "rgba(225,125,125)" : "rgba(0,0,0)",
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

const CompoundBar = (props) => {
  // pull goals from redux store
  const goalState = props.goalState;
  const totals = goalState.totals;
  const currentTotal = props.totals;

  const bars = [];

  for (const [key, value] of Object.entries(totals)) {
    if (key !== "All") {
      bars.push({ category: key, amount: value });
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {bars.length > 0 ? (
        <ul className={classes.scrollList}>
          {bars.map((e) => (
            <li key={e.category}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2">{e.category}</Typography>
                <Typography
                  variant="subtitle1"
                  style={{ alignSelf: "flex-end" }}
                >
                  ${currentTotal[e.category] ? currentTotal[e.category] : 0} / $
                  {e.amount} Spent
                </Typography>
              </div>
              <GoalProgress
                max={e.amount}
                current={
                  currentTotal[e.category] ? currentTotal[e.category] : 0
                }
                label={e.label}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No goals set</Typography>
      )}
    </div>
  );
};

export default CompoundBar;
