import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";
import { Typography } from "@material-ui/core";

const LineGraph = () => {
  const transactionState = useSelector(transactionsSelector);

  const monthlyTotals = transactionState.monthlyTotals;

  // need to sort months by date
  const toSort = [];
  for (const month in monthlyTotals) {
    toSort.push([month, monthlyTotals[month]]);
  }

  const toSlice = toSort.sort(
    (a, b) => moment(a[0], "MM YY") - moment(b[0], "MM YY")
  );

  const sortedMonths =
    toSlice.length > 12 ? toSlice.slice(toSlice.length - 12) : toSlice;

  const state = {
    labels: [],
    datasets: [
      {
        label: "Monthly Total",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [],
      },
    ],
  };

  sortedMonths.map((e) => {
    state.labels.push(e[0]);
    state.datasets[0].data.push(e[1]);
  });

  return (
    <div
      style={{
        padding: "2%",
        height: "75vh",
        width: "90vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Progress</Typography>
      <Line
        width={550}
        height={230}
        data={state}
        options={{
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          spanGaps: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 6,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default LineGraph;
