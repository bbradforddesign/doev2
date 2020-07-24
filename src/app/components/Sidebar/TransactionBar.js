import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { makeStyles } from "@material-ui/core/styles";

// styling and breakpoints
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "3% 0",
    width: "100%",
  },
}));

const TransactionBar = (props) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ul
        style={{
          listStyle: "none",
          height: "50vh",
          width: "80%",
          overflow: "hidden",
          overflowY: "scroll",
          padding: 0,
        }}
      >
        {props.transactions.map((e) => (
          <li key={e.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "5%",
              }}
            >
              <Typography
                variant="caption"
                textAlign="left"
                style={{ alignSelf: "center" }}
              >
                <strong>
                  {e.category} - {moment(e.created_date).format("MM/DD/YYYY")}
                </strong>
              </Typography>
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/transaction/edit",
                  props: {
                    id: e.id,
                    description: e.description,
                    category: e.category,
                    amount: e.amount,
                    date: e.created_date,
                  },
                }}
              >
                <IconButton>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: "5%",
              }}
            >
              <Typography variant="subtitle1">{e.description}</Typography>
              <Typography variant="subtitle1">
                <strong>${e.amount}</strong>
              </Typography>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      <Link to="/transaction/new">
        <IconButton>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Link>
    </section>
  );
};

export default TransactionBar;
