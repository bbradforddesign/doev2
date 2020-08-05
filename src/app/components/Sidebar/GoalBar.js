import React from "react";
import { Link } from "react-router-dom";

import { goalsSelector } from "../../slices/goals";
import { useSelector } from "react-redux";

import { Typography, Box, Button, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  scrollList: {
    overflow: "hidden",
    overflowY: "scroll",
    height: "90%",
    width: "100%",
  },
  body: {
    height: "85%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      width: "50%",
      height: "90%",
      alignSelf: "flex-start",
    },
  },
  head: {
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
  },
}));

const GoalBar = () => {
  const classes = useStyles();

  const { goals } = useSelector(goalsSelector);

  console.log(goals);
  return (
    <section className={classes.root}>
      <Box className={classes.head}>
        <Typography variant="h2" align="center">
          Goals
        </Typography>
      </Box>
      <Box className={classes.body}>
        <ul className={classes.scrollList}>
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
          <Button variant="contained" color="primary" size="large">
            New
          </Button>
        </Link>
      </Box>
    </section>
  );
};

export default GoalBar;
