import React, { useState } from "react";

const Transaction = (props) => {
  const [detailView, setDetailView] = useState(false);

  // trigger detailed view
  const triggerDetail = () => {
    setDetailView(!detailView);
  };
  return (
    <div>
      {detailView ? (
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
            <form>
              <h2>Edit Transaction {props.id}</h2>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                onChange={props.handleItem}
                placeholder={props.description}
              />
              <br />
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                list="categoryName"
                onChange={props.handleItem}
                placeholder={props.category}
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
              <br />
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                onChange={props.handleItem}
                placeholder={props.amount}
              />
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props.deleteItem(props.id);
                }}
              >
                Delete Item
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props.updateItem(props.id);
                  props.clearInputs();
                }}
              >
                Update Item
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  triggerDetail();
                  props.clearInputs();
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "#EEE" }}>
          <h1>{props.id}</h1>
          <p>
            Description: {props.description} Category: {props.category} Amount:{" "}
            {props.amount}
          </p>
          <button
            onClick={() => {
              triggerDetail();
              props.clearInputs();
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Transaction;
