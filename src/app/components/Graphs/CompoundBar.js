/**
 * TODO:
 *
 * Need to generate 'health bars' for each goal, to display how much funds remain for each category.
 */
import React from "react";
import { useSelector } from "react-redux";
import { goalsSelector } from "../../slices/goals";
import { transactionsSelector } from "../../slices/transactions";

import { Paper } from "@material-ui/core";

const GoalProgress = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "10px",
        width: "18vw",
        boxShadow: "2px 2px 4px #CCC",
      }}
    >
      <div
        style={{
          backgroundColor: "#777",
          flex: props.current,
        }}
      />
      <div
        className="growBar"
        style={{
          backgroundColor: "#f0f0f0",
          flex: props.max - props.current,
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

  const bars = [];

  for (const [key, value] of Object.entries(totals)) {
    if (key !== "All") {
      bars.push({ category: key, amount: value });
    }
  }

  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "18vw",
        margin: "0 1vw 5vh",
        padding: "0 2%",
        height: "40vh",
      }}
    >
      <p>Goal Forecast</p>
      <ul
        style={{
          padding: "0",
          listStyle: "none",
        }}
      >
        {bars.map((e) => (
          <li key={e.category}>
            <p style={{ marginBottom: 2, fontSize: ".85em" }}>
              {e.category}: $
              {e.amount -
                (transactionState.totals[e.category]
                  ? transactionState.totals[e.category]
                  : 0)}{" "}
              remaining
            </p>
            <GoalProgress
              max={e.amount}
              current={
                transactionState.totals[e.category]
                  ? transactionState.totals[e.category]
                  : 0
              }
              label={e.label}
            />
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default CompoundBar;
