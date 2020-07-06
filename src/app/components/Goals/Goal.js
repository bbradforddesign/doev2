import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button } from "@material-ui/core";

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
            category: props.category,
            amount: props.amount,
          },
        }}
        style={{
          textDecoration: "none",
        }}
      >
        <Button variant="outlined">Edit</Button>
      </Link>
    </div>
  );
};

export default Goal;
