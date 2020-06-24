import React, { useState } from "react";
import apiMethods from "../../utils/GoalApi";
import moment from "moment";

const GoalForm = (props) => {
  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "",
    amount: 0,
    date: moment().format("YYYY/MM/DD"),
  });

  const handleCreate = () => {
    console.log(item);
    apiMethods.Create(item.category, item.amount, item.date);
  };
  const handleUpdate = () => {
    apiMethods.Update(props.id, item.category, item.amount, item.month);
  };
  const handleDelete = () => {
    apiMethods.Delete(props.id);
  };
  const handleItem = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
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
    <form
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
      <button onClick={() => (props.id ? handleUpdate() : handleCreate())}>
        Save
      </button>
      {props.id && <button onClick={() => handleDelete()}>Delete</button>}
    </form>
  );
};

export default GoalForm;
