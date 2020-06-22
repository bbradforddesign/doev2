import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  transactionsSelector,
} from "../slices/transactions";
import Calculator from "./Calculator";

import TransactionBar from "./TransactionBar";

const Transactions = () => {
  // sidebar display logic
  const [transactionView, setTransactionView] = useState(false);
  const [goalView, setGoalView] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { transactions, loading, hasErrors } = useSelector(
    transactionsSelector
  );

  // on mount, fetch transactions to render
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  /**
   * Conditional rendering. Represents current state from redux store.
   * Represent transactions programatically since they're constantly changing.
   */
  const renderTransactions = () => {
    if (loading) return <p>Loading Transactions</p>;
    if (hasErrors) return <p>Unable to Retrieve Transactions</p>;

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
            {transactionView && <TransactionBar transactions={transactions} />}
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
                onClick={() => setTransactionView(!transactionView)}
              >
                Toggle Transaction Bar
              </button>
              <button
                style={{
                  margin: "10px",
                }}
              >
                Toggle Goal Bar
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <Calculator transactions={transactions} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return <section>{renderTransactions()}</section>;
};

export default Transactions;
