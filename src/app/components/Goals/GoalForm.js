import React, { useState } from "react";
import apiMethods from "../../utils/GoalApi";

const GoalForm = (props) => {
  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "",
    description: "",
    amount: 0,
    start_date: new Date(),
    end_date: new Date(),
  });

  const handleCreate = () => {
    apiMethods.Create(
      item.category,
      item.description,
      item.amount,
      item.start_date,
      item.end_date
    );
  };
  const handleUpdate = () => {
    apiMethods.Update(
      props.id,
      item.category,
      item.description,
      item.amount,
      item.start_date,
      item.end_date
    );
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
      <label htmlFor="description">Description</label>
      <input type="text" name="description" onChange={handleItem} />
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
      <label htmlFor="start_date">Start Date</label>
      <input type="date" name="start_date" onChange={handleItem} />
      <label htmlFor="end_date">End Date</label>
      <input type="date" name="end_date" onChange={handleItem} />
      <button onClick={() => (props.id ? handleUpdate() : handleCreate())}>
        Save
      </button>
      {props.id && <button onClick={() => handleDelete()}>Delete</button>}
    </form>
  );
};

export default GoalForm;
