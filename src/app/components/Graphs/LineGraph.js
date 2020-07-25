import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 2%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
      height: "50vh",
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: "10%",
      height: "60vh",
      width: "100%",
      flexDirection: "row",
    },
  },
  chart: { width: "60vw", maxWidth: "600px", height: "80%" },
}));

const LineGraph = () => {
  const classes = useStyles();

  // pull transaction totals by month from store
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

  // limit number of months displayed to 12
  const sortedMonths =
    toSlice.length > 12 ? toSlice.slice(toSlice.length - 12) : toSlice;

  // config for graph
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

  // store max values for calculations within notes section
  const maxes = [];

  // push data from sorted array into the graph
  sortedMonths.map((e) => {
    state.labels.push(e[0]);
    state.datasets[0].data.push(e[1]);
    maxes.push(e[1]);
  });

  return (
    <Box className={classes.root}>
      <div>
        <Typography variant="h2" align="center" style={{ marginBottom: "2%" }}>
          Trends
        </Typography>
        <div className={classes.chart}>
          <Line
            data={state}
            options={{
              responsive: true,
              maintainAspectRatio: true,
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
                      min: 0,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: "1px" }}>
        <Typography variant="subtitle2" align="right">
          Average month: $
          {(maxes.reduce((i, e) => i + e) / maxes.length).toFixed(2)}
        </Typography>
        <Typography variant="subtitle2" align="right">
          12 month total: ${maxes.reduce((i, e) => i + e).toFixed(2)}
        </Typography>
        <Typography variant="subtitle2" align="right">
          Highest month: ${Math.max(...maxes)}
        </Typography>
        <Typography variant="subtitle2" align="right">
          Lowest month: ${Math.min(...maxes)}
        </Typography>
      </div>
    </Box>
  );
};

export default LineGraph;
