import React, { useState } from "react";
import Transaction from "./Transaction";

const TransactionBar = (props) => {
  const [display, setDisplay] = useState(true);

  // clear inputs after submitting changes to prevent unwanted changes
  const clearInputs = () => {
    props.setItem({
      category: "",
      description: "",
      amount: 0,
    });
  };

  // Handlers. Listens for user input, and call functions when something happens.
  // preventDefault required to stop reloading page
  const handleCreate = (e) => {
    e.preventDefault();
    props.apiMethods.Create();
  };
  const handleItem = (e) => {
    props.setItem({
      ...props.item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {display ? (
        <div>
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
                    updateItem={props.apiMethods.Update}
                    deleteItem={props.apiMethods.Delete}
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
          <button onClick={() => setDisplay(false)}>Hide Bar</button>
        </div>
      ) : (
        <button onClick={() => setDisplay(true)}>Show Bar</button>
      )}
    </div>
  );
};

export default TransactionBar;
