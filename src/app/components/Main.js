import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  transactionsSelector,
} from "../slices/transactions";
import { fetchGoals, goalsSelector } from "../slices/goals";
import Calculator from "./Analysis/Calculator";

import TransactionBar from "./Transactions/TransactionBar";
import GoalBar from "./Goals/GoalBar";

const Main = () => {
  // sidebar display logic
  const [sideView, setSideView] = useState();

  // Redux
  const dispatch = useDispatch();
  const {
    transactions,
    loadingTransactions,
    hasErrorsTransactions,
  } = useSelector(transactionsSelector);
  const { goals, loading, hasErrors } = useSelector(goalsSelector);

  const refresh = () => {
    dispatch(fetchTransactions());
    dispatch(fetchGoals());
  };

  // on mount, fetch transactions to render
  useEffect(() => {
    refresh();
  }, [dispatch]);

  const renderSide = (sideView) => {
    if (sideView === "transactions") {
      return <TransactionBar transactions={transactions} />;
    }
    if (sideView === "goals") {
      return <GoalBar goals={goals} />;
    }
  };
  /**
   * Conditional rendering. Represents current state from redux store.
   * Represent transactions programatically since they're constantly changing.
   */
  const renderTransactions = () => {
    if (loadingTransactions) return <p>Loading Transactions</p>;
    if (hasErrorsTransactions) return <p>Unable to Retrieve Transactions</p>;
    if (loading) return <p>Loading Goals</p>;
    if (hasErrors) return <p>Unable to Retrieve Goals</p>;

    return (
      <div>
        {transactions && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {renderSide(sideView)}
            <div
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                backgroundColor: "red",
                width: "10vw",
              }}
            >
              <button
                style={{
                  margin: "10px",
                }}
                onClick={
                  !sideView
                    ? () => setSideView("transactions")
                    : () => setSideView("")
                }
              >
                Toggle Transaction Bar
              </button>
              <button
                style={{
                  margin: "10px",
                }}
                onClick={
                  !sideView ? () => setSideView("goals") : () => setSideView("")
                }
              >
                Toggle Goal Bar
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <Calculator transactions={transactions} goals={goals} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return <section>{renderTransactions()}</section>;
};

export default Main;
