/**
 * TODO:
 *
 * Need to generate 'health bars' for each goal, to display how much funds remain for each category.
 */
import React from "react";
import { useSelector } from "react-redux";
import { goalsSelector } from "../../slices/goals";
import { transactionsSelector } from "../../slices/transactions";
import { Typography } from "@material-ui/core";

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

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ul
        style={{
          padding: 0,
          listStyle: "none",
          margin: "0 0 10%",
          width: "100%",
        }}
      >
        {bars.map((e) => (
          <li key={e.category}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2%",
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5">Total Spent: ${currentTotal.All}</Typography>
      </div>
    </div>
  );
};

export default CompoundBar;
