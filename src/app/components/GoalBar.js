import React, { useState } from "react";
import Goal from "./Goal";

const GoalBar = (props) => {
  const [display, setDisplay] = useState(true);

  // clear inputs after submitting changes to prevent unwanted changes
  const clearInputs = () => {
    props.setItem({
      category: "",
      description: "",
      amount: 0,
      start_date: "",
      end_date: "",
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
            <h3>Goal List</h3>

            <ul
              style={{
                listStyle: "none",
                height: "50vh",
                width: "30vw",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              {props.goals.map((e) => (
                <li key={e.id}>
                  <Goal
                    handleItem={handleItem}
                    updateItem={props.apiMethods.Update}
                    deleteItem={props.apiMethods.Delete}
                    description={e.description}
                    category={e.category}
                    amount={e.amount}
                    start_date={e.start_date}
                    end_date={e.end_date}
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
            <input
              type="text"
              name="category"
              list="categoryName"
              onChange={handleItem}
            />
            <datalist id="categoryName">
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Clothing">Clothing</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Insurance">Insurance</option>
              <option value="Household Supplies">Household Supplies</option>
              <option value="Personal">Personal</option>
              <option value="Debt">Debt</option>
              <option value="Retirement">Retirement</option>
              <option value="Education">Education</option>
              <option value="Savings">Savings</option>
              <option value="Gifts/Donations">Gifts/Donations</option>
              <option value="Entertainment">Entertainment</option>
            </datalist>
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" onChange={handleItem} />
            <label htmlFor="start_date">Start Date</label>
            <input type="date" name="start_date" onChange={handleItem} />
            <label htmlFor="end_date">End Date</label>
            <input type="date" name="end_date" onChange={handleItem} />
            <button onClick={handleCreate}>Record Goal</button>
          </form>
          <button onClick={() => setDisplay(false)}>Hide Bar</button>
        </div>
      ) : (
        <button onClick={() => setDisplay(true)}>Show Bar</button>
      )}
    </div>
  );
};

export default GoalBar;
