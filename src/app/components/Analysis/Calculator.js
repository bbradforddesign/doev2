import React, { useEffect, useState } from "react";
import Graph from "./Graph";

const Calculator = (props) => {
  const goals = props.goals;
  /**
   * Logic to generate transaction graph
   */
  // data structure to store graph data to be rendered
  const [total, setTotal] = useState({ all: 0, categories: {}, maxes: {} });
  const Transactions = props.transactions;
  // shorthand for the object where category totals are stored
  const AllCats = total.categories;

  // float cleaning utility
  const cleanFloat = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  // calculate totals of all categories. store in local state to render graph
  useEffect(() => {
    // grand total of all transactions
    const allReduced = cleanFloat(
      Transactions.reduce((x, y) => x + y.amount, 0)
    );
    // store all user created categories in state, and total up corresponding values
    Transactions.forEach((e) => {
      const cleaned = cleanFloat(e.amount);
      setTotal(
        AllCats[e.category]
          ? (AllCats[e.category] += cleaned)
          : (AllCats[e.category] = cleaned)
      );
    });
    setTotal({ ...total, all: allReduced });
    console.log(total);
  }, []);

  // store goal amounts for each category to show in analysis
  useEffect(() => {
    goals.forEach((goal) =>
      AllCats[goal.category] ? (total.maxes[goal.category] = goal.amount) : null
    );
  }, []);

  const Spent = cleanFloat(
    total.all - (total.categories.Income ? total.categories.Income : 0)
  );
  // pass calculated values on to be rendered
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Graph total={total} />
      <div style={{ marginTop: "3vh", width: "80%" }}>
        <h3 style={{ margin: 0 }}>Summary</h3>
        <p style={{ marginTop: "6px" }}>
          You have spent a total of ${Spent} this month
          {total.categories.Income
            ? `, and have $${total.categories.Income - Spent} remaining.`
            : "."}
        </p>
        {goals && (
          <>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {goals.map((e) => (
                <li key={e.id}>
                  <h4 style={{ margin: 0 }}>{e.category}</h4>
                  <p style={{ margin: "4px 0" }}>
                    You have spent{" "}
                    <strong>
                      ${AllCats[e.category]} out of your ${e.amount} goal.
                    </strong>
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
