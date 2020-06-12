import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../slices/transactions";
import Transaction from "./Transaction";

const TransactionBar = (props) => {
  const dispatch = useDispatch();
  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "",
    description: "",
    amount: 0,
  });

  const abortController = new AbortController();

  useEffect(() => {
    return () => abortController.abort();
  }, [dispatch]);

  // clear inputs after submitting changes to prevent unwanted changes
  const clearInputs = () => {
    setItem({
      category: "",
      description: "",
      amount: 0,
    });
  };

  /**
   * API methods (ie affect external resources, not local state)
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
    clearInputs();
    return () => {
      abortController.abort();
    };
  };
  const updateItem = async (itemId) => {
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
    dispatch(fetchTransactions());
    return () => {
      abortController.abort();
    };
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
    return () => {
      abortController.abort();
    };
  };
  const handleItem = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Transaction List</h3>

        <ul
          style={{
            listStyle: "none",
            height: "50vh",
            width: "30vw",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {props.transactions.map((e) => (
            <li key={e.id}>
              <Transaction
                handleItem={handleItem}
                updateItem={updateItem}
                deleteItem={deleteItem}
                description={e.description}
                category={e.category}
                amount={e.amount}
                id={e.id}
                clearInputs={clearInputs}
              />
            </li>
          ))}
        </ul>
      </section>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "30vw",
        }}
      >
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={handleItem} />
        <label htmlFor="category">Category</label>
        <input type="text" name="category" onChange={handleItem} />
        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" onChange={handleItem} />
        <button onClick={handleCreate}>Record Transaction</button>
      </form>
    </>
  );
};

export default TransactionBar;
