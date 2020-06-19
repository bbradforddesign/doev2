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
  }, [Transactions]);

  // store goal amounts for each category in state to pass to graph
  useEffect(() => {
    goals.forEach((goal) =>
      AllCats[goal.category] ? (total.maxes[goal.category] = goal.amount) : null
    );
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
                  <p style={{ margin: "4px 0" }}>
                    You have spent{" "}
                    <strong>
                      ${AllCats[e.category]} out of your ${e.amount} goal,
                    </strong>
                    <br />
                    and there are{" "}
                    <strong>
                      {moment().diff(e.end_date, "days") * -1} full days
                      remaining.
                    </strong>
                    <br />
                    To stay within bounds, you will need to spend less than{" "}
                    <strong>
                      $
                      {cleanFloat(
                        ((e.amount - AllCats[e.category]) /
                          moment().diff(e.end_date, "days")) *
                          -7
                      )}{" "}
                      per week.
                    </strong>
                  </p>
                  <p style={{ marginTop: 0 }}>
                    <em>
                      {e.amount /
                        moment(e.start_date).diff(e.end_date, "days") <
                      (e.amount - AllCats[e.category]) /
                        moment().diff(e.end_date, "days")
                        ? "Be careful, you are currently spending more quickly than your goal suggests."
                        : "On track! Keep up the good work."}
                    </em>
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
