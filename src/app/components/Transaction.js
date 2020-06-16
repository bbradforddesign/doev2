import React, { useState, useEffect } from "react";

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
                onChange={props.handleItem}
                placeholder={props.category}
              />
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
