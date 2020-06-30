import React from "react";
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import { Button } from "@material-ui/core";

const TransactionBar = React.forwardRef((props, ref) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "300px",
      }}
      ref={ref}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "rgb(150,250,150)",
        }}
      >
        <h3>Transaction List</h3>
      </div>
      <ul
        style={{
          listStyle: "none",
          height: "50vh",
          width: "80%",
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
              type={e.type}
            />
          </li>
        ))}
      </ul>
      <Link to="/transaction/new">
        <Button variant="contained" color="primary">
          New Transaction
        </Button>
      </Link>
    </section>
  );
});

export default TransactionBar;
