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
    if (key !== "All" && key !== "Income") {
      if (!state.labels[key]) {
        state.labels.push(key);
        state.datasets[0].data.push(value);
      }
    }
  }

  // NOTE: need to set text to show data's date range
  return (
    <Paper style={{ padding: "3% 0" }}>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: "Expenses",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </Paper>
  );
};

export default PieChart;
