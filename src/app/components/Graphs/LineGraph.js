import React from "react";
import { Line } from "react-chartjs-2";

import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";

import { Paper } from "@material-ui/core";

const LineGraph = () => {
  const transactionState = useSelector(transactionsSelector);
  const totals = transactionState.totals;

  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <Paper style={{ padding: "2%" }}>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Expense Trends",
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

export default LineGraph;
