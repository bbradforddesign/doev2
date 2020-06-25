import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import apiMethods from "../../utils/GoalApi";
import moment from "moment";

const GoalForm = (props) => {
  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "",
    amount: 0,
    date: moment().format("YYYY/MM/DD"),
  });

  const routerProps = props.location.props;

  const handleCreate = () => {
    console.log(item);
    apiMethods.Create(item.category, item.amount, item.date);
  };
  const handleUpdate = () => {
    apiMethods.Update(routerProps.id, item.category, item.amount, item.month);
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
          height: "30vh",
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
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            list="categoryName"
            onChange={handleItem}
          />
          <datalist id="categoryName">
            {categoryOptions.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          </datalist>
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" onChange={handleItem} />
          <button
            onClick={() => {
              routerProps ? handleUpdate() : handleCreate();
              handleSubmit();
            }}
          >
            Save
          </button>
          {props.id && (
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

export default withRouter(GoalForm);
