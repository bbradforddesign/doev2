import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Doughnut } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
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

const PieChart = (props) => {
  const classes = useStyles();

  const totals = props.totals;

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

  return (
    <div className={classes.chart}>
      <Doughnut
        height={150}
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
