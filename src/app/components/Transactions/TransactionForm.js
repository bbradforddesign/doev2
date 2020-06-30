import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import apiMethods from "../../utils/TransactionApi";

const TransactionForm = (props) => {
  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "Income",
    description: "",
    amount: 0,
    type: "",
  });

  const routerProps = props.location.props;

  const handleCreate = async () => {
    apiMethods.Create(item.category, item.description, item.amount, item.type);
  };
  const handleUpdate = () => {
    apiMethods.Update(
      routerProps.id,
      item.category,
      item.description,
      item.amount,
      item.type
    );
  };
  const handleDelete = () => {
    apiMethods.Delete(routerProps.id);
  };
  const handleItem = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  // redirects to main page; need to add props to keep sidebar open persistently.
  const handleSubmit = () => {
    props.history.replace("/main");
    window.location.reload();
  };

  const categoryOptions = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Clothing",
    "Healthcare",
    "Insurance",
    "Household Supplies",
    "Personal",
    "Debt",
    "Retirement",
    "Education",
    "Savings",
    "Gifts/Donations",
    "Entertainment",
  ];

  const messageArray = [
    "Click save to submit",
    "Amount must be greater than 0",
  ];
  let message = messageArray[0];
  if (item.amount <= 0) message = messageArray[1];
  /**
   * NOTE:
   * Using div rather than form to prevent unwanted params added to url.
   * Desired behavior, but possible semantic problem. Better fix?
   */
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(200,200,200,.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#EEE",
          width: "50vw",
          height: "40vh",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "30vw",
          }}
        >
          <h2>
            {routerProps ? routerProps.description : "Create new Transaction"}
          </h2>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleItem}
            placeholder={routerProps ? routerProps.description : "Description"}
          />
          <div>
            <label htmlFor="expense">
              <input
                type="radio"
                id="expense"
                name="type"
                onChange={handleItem}
                value="expense"
              />
              Expense
            </label>
          </div>
          <div>
            <label htmlFor="income">
              <input
                type="radio"
                id="income"
                name="type"
                onChange={handleItem}
                value="income"
              />
              Income
            </label>
          </div>
          {item.type === "expense" ? (
            <>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                list="categoryName"
                onChange={handleItem}
                placeholder={routerProps ? routerProps.category : "Category"}
              />
              <datalist id="categoryName">
                {categoryOptions.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </datalist>
            </>
          ) : null}
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            onChange={handleItem}
            placeholder={routerProps ? routerProps.amount : "Amount"}
          />
          {!routerProps && <p>{message}</p>}
          {(message === messageArray[0] || routerProps) && (
            <button
              onClick={() => {
                routerProps ? handleUpdate() : handleCreate();
                handleSubmit();
              }}
            >
              Save
            </button>
          )}
          {routerProps && (
            <button
              onClick={() => {
                handleDelete();
                handleSubmit();
              }}
            >
              Delete
            </button>
          )}

          <Link
            to={{
              pathname: "/main",
            }}
          >
            <button>Done</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TransactionForm);
