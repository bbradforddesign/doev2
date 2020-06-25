import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Transaction = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#EEE",
        margin: "2%",
        borderRadius: "5%",
      }}
    >
      <h3>{props.description}</h3>
      <p>{moment(props.created).format("MM/DD/YY")}</p>
      <p>{props.category}</p>
      <p>${props.amount}</p>
      <Link
        to={{
          pathname: "/transaction/edit",
          props: {
            id: props.id,
            description: props.description,
            category: props.category,
            amount: props.amount,
          },
        }}
      >
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default Transaction;
