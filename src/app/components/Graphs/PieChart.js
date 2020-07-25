import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";
import { uiSelector } from "../../slices/ui";
import CompoundBar from "./CompoundBar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2%",
    width: "88%",
    height: "70vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginBottom: "2vh",
      width: "90%",
      overflow: "hidden",
      overflowY: "scroll",
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: "10%",
    },
  },
  content: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "45%",
    },
  },
  chart: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "50vh",
      margin: "10vh 0",
    },
    [theme.breakpoints.up("md")]: {
      width: "45%",
    },
  },
}));

const PieChart = () => {
  const classes = useStyles();

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

  const active = useSelector(uiSelector);

  return (
    <Box className={classes.root}>
      {state.labels.length > 0 ? (
        <>
          <div className={classes.content}>
            <CompoundBar month={active.month} />
          </div>
          <div className={classes.chart}>
            <Typography
              variant="h2"
              align="center"
              style={{ marginBottom: "2%" }}
            >
              Current
            </Typography>
            <Doughnut
              height={240}
              data={state}
              options={{
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </div>{" "}
        </>
      ) : (
        <Typography variant="h3">No transactions recorded.</Typography>
      )}
    </Box>
  );
};

export default PieChart;
