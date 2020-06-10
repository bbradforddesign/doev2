import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  transactionsSelector,
} from "../slices/transactions";

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
   * API methods (ie affect external resources, not local state)
   * TODO: Create Update method.
   *
   */
  const createItem = async () => {
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
    dispatch(fetchTransactions());
  };
  const deleteItem = async (itemId) => {
    await fetch(`http://localhost:3001/api/v1/transactions/${itemId}`, {
      method: "delete",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    dispatch(fetchTransactions());
  };

  // Handlers. Listens for user input, and call functions when something happens.
  const handleCreate = (e) => {
    e.preventDefault();
    createItem();
  };
  const handleItem = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
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
        <ul>
          {transactions &&
            // return a list item for each transaction, listing information and interactive buttons
            transactions.map((e) => (
              <li key={e.id}>
                {e.description}, {e.category}, ${e.amount}{" "}
                <button onClick={() => deleteItem(e.id)}>Delete Item</button>
              </li>
            ))}
        </ul>

        <input type="text" name="category" onChange={handleItem} />
        <input type="text" name="description" onChange={handleItem} />
        <input type="number" name="amount" onChange={handleItem} />
        <button onClick={handleCreate}>Record Transaction</button>
      </div>
    );
  };

  return <section>{renderTransactions()}</section>;
};

export default Transactions;
