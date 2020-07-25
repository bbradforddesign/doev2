import React from "react";
import { Link } from "react-router-dom";
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
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: "90%",
    },
    [theme.breakpoints.up("lg")]: {
      height: "100%",
    },
  },
}));

const GoalBar = (props) => {
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
        {props.goals.map((e) => (
          <li key={e.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "5%",
              }}
            >
              <Link
                to={{
                  pathname: "/goal/edit",
                  props: {
                    id: e.id,
                    category: e.category,
                    amount: e.amount,
                    description: e.description,
                  },
                }}
                style={{
                  textDecoration: "none",
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
              <Typography variant="subtitle1">{e.category}</Typography>
              <Typography variant="subtitle1">
                <strong>${e.amount}</strong>
              </Typography>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      <Link to="/goal/new">
        <IconButton>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Link>
    </section>
  );
};

export default GoalBar;
