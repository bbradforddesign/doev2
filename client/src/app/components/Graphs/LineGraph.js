import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    padding: "5px 15px",
  },
  chart: {
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginBottom: "5%",
    },
  },
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
      <Typography variant="h4">Monthly Trends</Typography>
      {maxes.length > 0 ? (
        <Box className={classes.body}>
          <div className={classes.chart}>
            <Line
              data={state}
              height={260}
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
          <div>
            <Typography variant="subtitle1" align="right">
              Max
            </Typography>
            <Typography variant="subtitle2" align="right">
              ${Math.max(...maxes).toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" align="right">
              Min
            </Typography>
            <Typography variant="subtitle2" align="right">
              {" "}
              ${Math.min(...maxes).toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" align="right">
              Avg
            </Typography>
            <Typography variant="subtitle2" align="right">
              ${(maxes.reduce((i, e) => i + e) / maxes.length).toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" align="right" color="primary">
              Total
            </Typography>
            <Typography variant="subtitle2" align="right" color="primary">
              ${maxes.reduce((i, e) => i + e).toFixed(2)}
            </Typography>
          </div>
        </Box>
      ) : (
        <Typography variant="h3">No transactions recorded.</Typography>
      )}
    </Box>
  );
};

export default LineGraph;
