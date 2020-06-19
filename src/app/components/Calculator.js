import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoals, goalsSelector } from "../slices/goals";
import moment from "moment";

const Calculator = (props) => {
  // Redux logic. Get all goals to determine progress
  const dispatch = useDispatch();
  const { goals, loading, hasErrors } = useSelector(goalsSelector);
  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  /**
   * Logic to generate transaction graph
   */
  // data structure to store graph data to be rendered
  const [total, setTotal] = useState({ all: 0, categories: {}, maxes: {} });
  const Transactions = props.transactions;
  // shorthand for the object where category totals are stored
  const AllCats = total.categories;

  // calculate totals of all categories. store in local state to render graph
  useEffect(() => {
    // grand total of all transactions
    const allReduced = Transactions.reduce((x, y) => x + y.amount, 0);
    // store all user created categories in state, and total up corresponding values
    Transactions.forEach((e) => {
      setTotal(
        AllCats[e.category]
          ? (AllCats[e.category] += e.amount)
          : (AllCats[e.category] = e.amount)
      );
    });
    setTotal({ ...total, all: allReduced });
  }, [Transactions]);

  // store goal amounts for each category in state to pass to graph
  useEffect(() => {
    goals.forEach((goal) =>
      AllCats[goal.category] ? (total.maxes[goal.category] = goal.amount) : null
    );
    console.log(total);
  }, [goals]);

  /**
   * Logic to determine goal progress
   */
  const renderGoals = () => {
    if (loading) return <h3>Loading</h3>;
    if (hasErrors) return <h3>Error loading goal progress</h3>;
    return (
      <div style={{ marginTop: "3vh" }}>
        <h3 style={{ margin: 0 }}>Summary</h3>
        <p style={{ marginTop: "6px" }}>
          You have spent a total of ${total.all} this month.
        </p>
        {goals && (
          <>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {goals.map((e) => (
                <li key={e.id}>
                  <h4 style={{ margin: 0 }}>{e.category}</h4>
                  <p style={{ marginTop: "4px" }}>
                    You have spent ${AllCats[e.category]} out of your $
                    {e.amount} goal. There are{" "}
                    {moment().diff(e.end_date, "days") * -1} full days remaining
                    in this goal; to stay within bounds, you will need to spend
                    less than $
                    {((e.amount - AllCats[e.category]) /
                      moment().diff(e.end_date, "days")) *
                      -7}{" "}
                    per week.
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  // pass calculated values on to be rendered
  return (
    <div>
      <Graph total={total} />
      {renderGoals()}
    </div>
  );
};

export default Calculator;
