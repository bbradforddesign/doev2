import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IconButton, Card, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const Transaction = (props) => {
  const themes = {
    expense: "#FF0000",
    income: "#00FF00",
  };
  return (
    <Card
      style={{
        backgroundColor: themes[props.type],
        margin: "2%",
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography variant="h4" style={{ flex: 1 }}>
          {props.description}
        </Typography>

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
          style={{
            alignSelf: "flex-end",
            top: 0,
            right: 0,
          }}
        >
          <IconButton variant="outlined">
            <EditIcon />
          </IconButton>
        </Link>
      </div>
      <Typography variant="h6">
        {props.type === "expense" ? "-$" + props.amount : "$" + props.amount}
      </Typography>
      <Typography variant="caption">
        {moment(props.created).format("MM/DD/YY")}
      </Typography>
      <Typography variant="subtitle1">{props.category}</Typography>
    </Card>
  );
};

export default Transaction;
