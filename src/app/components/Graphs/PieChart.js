import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";
import moment from "moment";

const PieChart = (props) => {
  const transactionState = useSelector(transactionsSelector);
  const totals = transactionState.categoryTotals;

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
    <div style={{ textAlign: "center" }}>
      <h2>{moment(props.month).format("MMMM YYYY")}</h2>
      <p>${totals.All} spent this month</p>

      <Pie
        height={300}
        data={state}
        options={{
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </div>
  );
};

export default PieChart;
