import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  transactionsSelector,
} from "../slices/transactions";
import Calculator from "./Calculator";

import TransactionBar from "./TransactionBar";

const abortController = new AbortController();

const Transactions = () => {
  // Redux
  const dispatch = useDispatch();
  const { transactions, loading, hasErrors } = useSelector(
    transactionsSelector
  );

  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "",
    description: "",
    amount: 0,
  });

  // on mount, fetch transactions to render
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  /**
   * API methods (ie affect external resources, not local state). Refresh redux store to subscribe to changes in db.
   *
   */
  const apiMethods = {
    Create: async () => {
      try {
        await fetch(`http://localhost:3001/api/v1/transactions`, {
          method: "post",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            category: item.category,
            description: item.description,
            amount: item.amount,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(fetchTransactions());
      return () => abortController.abort();
    },
    Update: async (itemId) => {
      try {
        await fetch(`http://localhost:3001/api/v1/transactions/${itemId}`, {
          method: "put",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            category: item.category,
            description: item.description,
            amount: item.amount,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(fetchTransactions());
      return () => abortController.abort();
    },
    Delete: async (itemId) => {
      try {
        await fetch(`http://localhost:3001/api/v1/transactions/${itemId}`, {
          method: "delete",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(fetchTransactions());
      return () => abortController.abort();
    },
  };

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
            <TransactionBar
              transactions={transactions}
              apiMethods={apiMethods}
              setItem={setItem}
              item={item}
            />
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
