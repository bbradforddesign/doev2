import React from "react";
import GraphBar from "./GraphBar";

const Graph = (props) => {
  const total = props.total;

  /**
   * Use object prototype to generate bars for graph based on category names
   * and corresponding totals
   */
  const Categories = Object.keys(total.categories);

  /**
   * for each category, generate a new bar with that category's data.
   *
   */

  const barArray = [];
  for (let i = 0; i < Categories.length; i++) {
    const category = Categories[i];
    barArray.push(
      <div key={i}>
        <h5 style={{ margin: "6px 0 4px 0" }}>{category}</h5>
        <GraphBar current={total.categories[category]} total={total.all} />
      </div>
    );
  }
  // sort bars by descending value.
  barArray.sort((a, b) =>
    a.props.children[1].props.current > b.props.children[1].props.current
      ? -1
      : 1
  );

  return (
    <div style={{ width: "80%" }}>
      <h2 style={{ marginBottom: "8px" }}>Expense Analysis</h2>
      {barArray.map((e) => {
        return e;
      })}
    </div>
  );
};

export default Graph;
