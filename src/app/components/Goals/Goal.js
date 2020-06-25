import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Goal = (props) => {
  return (
    <div style={{ backgroundColor: "#EEE", margin: "2%", borderRadius: "5%" }}>
      <h3>{props.category}</h3>
      <p>{moment(props.date).format("MM/YY")}</p>
      <p>${props.amount}</p>
      <Link
        to={{
          pathname: "/goal/edit",
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

export default Goal;
