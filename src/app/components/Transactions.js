import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  transactionsSelector,
} from "../slices/transactions";
import Calculator from "./Calculator";

import TransactionBar from "./TransactionBar";

const Transactions = () => {
  // Redux
  const dispatch = useDispatch();
  const { transactions, loading, hasErrors } = useSelector(
    transactionsSelector
  );

  const [viewDash, setViewDash] = useState(true);

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
            {viewDash ? (
              <div style={{ backgroundColor: "rgb(245,245,255)" }}>
                <TransactionBar transactions={transactions} />
                <button onClick={() => setViewDash(!viewDash)}>
                  Hide Dashboard
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => setViewDash(!viewDash)}>
                  View Dashboard
                </button>
              </div>
            )}
            <div style={{ width: "60vw", paddingLeft: "10vw" }}>
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
