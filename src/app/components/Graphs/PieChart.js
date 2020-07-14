import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";

import { Paper } from "@material-ui/core";

const PieChart = () => {
  const transactionState = useSelector(transactionsSelector);
  const totals = transactionState.totals;

  const state = {
    labels: [],
    datasets: [
      {
        label: "Expenses",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [],
      },
    ],
  };

  // insert each category's name and total into the pie chart
  for (const [key, value] of Object.entries(totals)) {
    if (key !== "All") {
      if (!state.labels[key]) {
        state.labels.push(key);
        state.datasets[0].data.push(value);
      }
    }
  }

  // NOTE: need to set text to show data's date range
  return (
    <Paper style={{ height: "80%", width: "40%" }}>
      <div style={{ textAlign: "center", top: 10, bottom: 10 }}>
        <h2>Expense Report</h2>
        <h4>${totals.All} Total Spent This Month</h4>
      </div>
      <Pie
        height={200}
        data={state}
        options={{
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </Paper>
  );
};

export default PieChart;
