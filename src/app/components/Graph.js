import React, { useEffect } from "react";
import GraphBar from "./GraphBar";

const Graph = (props) => {
  const total = props.total;

  /**
   * Use object prototype to generate bars for graph based on category names
   * and corresponding totals
   */
  const Categories = Object.keys(total.categories);

  /**
   * for each category in state, generate a new bar with that category's data.
   *
   */

  const barArray = [];
  for (let i = 0; i < Categories.length; i++) {
    const category = Categories[i];
    barArray.push(
      <div key={i}>
        <h4>{category}</h4>
        <GraphBar
          current={total.categories[category]}
          max={total.maxes[category]}
          total={total.all}
        />
      </div>
    );
    console.log(barArray[0].props.children[1].props.max);
  }
  // sort bars by descending value.
  barArray.sort((a, b) =>
    a.props.children[1].props.current > b.props.children[1].props.current
      ? -1
      : 1
  );

  return (
    <section>
      <h4>Expense Analysis</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50vw",
        }}
      >
        {barArray.map((e) => {
          return e;
        })}
      </div>
    </section>
  );
};

export default Graph;
