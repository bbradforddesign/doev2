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
      <div>
        {goals && (
          <>
            <h3>Goal Progress</h3>
            <ul>
              {goals.map((e) => (
                <li key={e.id}>
                  <h4>{e.category}</h4>
                  <p>{e.description}</p>
                  {
                    // one extra day added to account for incomplete days since hours aren't rendered
                    moment().diff(e.end_date, "days") * -1 > 0
                      ? moment().diff(e.end_date, "days") * -1 +
                        1 +
                        " days remaining"
                      : "Goal expired"
                  }
                  <p>
                    {Object.keys(total.categories).includes(e.category)
                      ? "$" +
                        (e.amount - total.categories[e.category]) +
                        " Remaining"
                      : "No expenses within this goal"}
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
