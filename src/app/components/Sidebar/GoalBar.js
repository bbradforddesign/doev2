import React from "react";
import { Link } from "react-router-dom";

import { goalsSelector } from "../../slices/goals";
import { useSelector } from "react-redux";

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
    width: "100%",
    height: "90%",
  },
}));

const GoalBar = () => {
  const classes = useStyles();

  const { goals } = useSelector(goalsSelector);

  console.log(goals);
  return (
    <section className={classes.root}>
      <Typography variant="h3" align="center">
        Monthly Goals
      </Typography>
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
        {goals.length > 0 ? (
          goals.map((e) => (
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
                    pathname: "/edit/goal",
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
          ))
        ) : (
          <Typography>Record Goals</Typography>
        )}
      </ul>
      <Link to="/create/goal">
        <IconButton>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Link>
    </section>
  );
};

export default GoalBar;
