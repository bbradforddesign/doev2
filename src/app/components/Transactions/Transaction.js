import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Transaction = (props) => {
  return (
    <div style={{ backgroundColor: "#EEE", margin: "2%", borderRadius: "5%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        />
        <p>{moment(props.created).format("YYYY/MM/DD")}</p>
      </div>
      <h4>{props.description}</h4>
      <p>
        ${props.amount} {props.category}
      </p>
      <Link
        to={{
          pathname: "/transaction/edit",
          props: {
            id: props.id,
          },
        }}
      >
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default Transaction;
