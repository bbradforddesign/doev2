import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";

const LineGraph = () => {
  const transactionState = useSelector(transactionsSelector);

  const months = {};

  // need to calculate monthly totals. shift to backend?
  transactionState.transactions.filter((e) => {
    const month = moment(e.created_date).format("MM/YY");
    if (!months[month]) {
      months[month] = e.amount;
    } else {
      months[month] += e.amount;
    }
  });
  // need to sort months by date
  const toSort = [];
  for (const month in months) {
    toSort.push([month, months[month]]);
  }
  const sortedMonths = toSort.sort(
    (a, b) => new moment(a[0]) - new moment(b[0])
  );
  console.log(sortedMonths);

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
        marginTop: "2vh",
      }}
    >
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Monthly Trends",
            fontSize: 20,
          },
          legend: {
            display: false,
          },
          spanGaps: true,
        }}
      />
    </div>
  );
};

export default LineGraph;
