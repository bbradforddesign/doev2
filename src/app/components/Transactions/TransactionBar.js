import React from "react";
import { Link } from "react-router-dom";

import Transaction from "./Transaction";
import TransactionForm from "./TransactionForm";

const TransactionBar = (props) => {
  return (
    <div style={{ flex: 1 }}>
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
                description={e.description}
                category={e.category}
                amount={e.amount}
                id={e.id}
                created={e.created_date}
              />
            </li>
          ))}
        </ul>
      </section>
      <Link to="/transaction/new">Form</Link>
    </div>
  );
};

export default TransactionBar;
