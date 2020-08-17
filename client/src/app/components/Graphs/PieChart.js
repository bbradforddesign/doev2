import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  head: {
    marginBottom: "5%",
  },
}));

const PieChart = (props) => {
  const classes = useStyles();

  const totals = props.totals;

  const state = {
    labels: [],
    datasets: [
      {
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
    <Box>
      <Typography variant="h4" align="center" className={classes.head}>
        Categories
      </Typography>
      <Doughnut
        data={state}
        height={280}
        options={{
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
