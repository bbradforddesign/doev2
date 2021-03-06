import React from "react";
import { Typography, Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

// styling and breakpoints
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 5%",
    [theme.breakpoints.down("sm")]: {
      height: "90%",
    },
    [theme.breakpoints.up("md")]: {
      height: "30vh",
    },
  },
  scrollList: {
    padding: "0 3% 0 0",
    height: "75%",
    [theme.breakpoints.up("md")]: {
      overflow: "hidden",
      overflowY: "scroll",
    },
  },
}));

const GoalProgress = (props) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        height: "8px",
        width: "100%",
        marginBottom: "8px",
      }}
    >
      <Box
        style={{
          backgroundColor:
            props.max <= props.current
              ? "rgb(225,125,125)"
              : "rgb(125,255,125)",
          flex: props.current,
        }}
      />
      <Box
        className="growBar"
        style={{
          backgroundColor: "#f0f0f0",
          flex: props.max >= props.current ? props.max - props.current : 0,
        }}
      />
    </Box>
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
    <Box className={classes.root}>
      <Typography variant="h4" align="center">
        Goal Progress
      </Typography>
      {bars.length > 0 ? (
        <ul className={classes.scrollList}>
          {bars.map((e) => (
            <li key={e.category}>
              <Box
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
              </Box>
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
        <Box
          style={{
            width: "100%",
            height: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">
            No goals set.
            <br />
            Set spending goals to view progress!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CompoundBar;
