import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

import { Typography, Box, Paper, IconButton } from "@material-ui/core";
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
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  scrollList: {
    overflow: "hidden",
    overflowY: "scroll",
    height: "70%",
    width: "100%",
    margin: "5% 0",
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

const ListBody = (props) => {
  const classes = useStyles();

  // determine which list to render based on props
  const listCategory = props.type;
  const state = useSelector(props.selector);
  const list = listCategory === "goal" ? state.goals : state.monthly;

  return (
    <section className={classes.root}>
      <Box className={classes.head}>
        <Typography variant="h2" align="center" color="textPrimary">
          {listCategory === "goal" ? "Spending Goals" : "Monthly Expenses"}
        </Typography>
        <Typography variant="h6" align="center" style={{ marginTop: "5%" }}>
          {listCategory === "goal"
            ? "Set budgeting goals for any category"
            : "Track expenses for each month"}
        </Typography>
      </Box>
      <Box className={classes.body}>
        {list.length > 0 ? (
          <Paper className={classes.scrollList}>
            <ul>
              {list.map((e) => (
                <li key={e.id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        listCategory === "transaction" ? "row" : "row-reverse",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "5%",
                    }}
                  >
                    {listCategory === "transaction" ? (
                      <>
                        <Typography
                          variant="caption"
                          textAlign="left"
                          style={{ alignSelf: "center", marginLeft: "3%" }}
                        >
                          <strong>
                            {e.category} -{" "}
                            {moment(e.created_date).format("MM/DD/YYYY")}
                          </strong>
                        </Typography>
                        <Link
                          to={{
                            pathname: `/edit/transaction`,
                            props: {
                              id: e.id,
                              category: e.category,
                              amount: e.amount,
                              description: e.description,
                            },
                          }}
                        >
                          <IconButton>
                            <EditIcon fontSize="small" color="primary" />
                          </IconButton>
                        </Link>
                      </>
                    ) : (
                      <Link
                        to={{
                          pathname: `/edit/goal`,
                          props: {
                            id: e.id,
                            category: e.category,
                            amount: e.amount,
                            description: e.description,
                          },
                        }}
                      >
                        <IconButton>
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Link>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 3%",
                    }}
                  >
                    <Typography variant="subtitle1">{e.category}</Typography>
                    <Typography variant="subtitle1">
                      <strong>${e.amount}</strong>
                    </Typography>
                  </div>
                  <hr style={{ margin: "0 3%" }} />
                </li>
              ))}
            </ul>
          </Paper>
        ) : (
          <Paper
            className={classes.scrollList}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {listCategory === "transaction" ? (
              <Typography variant="subtitle1">
                No expenses recorded.
                <br />
                Let's get started!
              </Typography>
            ) : (
              <Typography variant="subtitle1">
                No spending goals set.
                <br />
                Let's get started!
              </Typography>
            )}
          </Paper>
        )}
        <Link to={`/create/${listCategory}`} style={{ textDecoration: "none" }}>
          <Paper
            style={{
              backgroundColor: "rgb(75,100,255)",
              paddingRight: "15px",
            }}
          >
            <IconButton>
              <AddCircleIcon fontSize="large" htmlColor="white" />
            </IconButton>
            <Typography
              variant="caption"
              align="center"
              className="CreateButton"
            >
              Create
            </Typography>
          </Paper>
        </Link>
      </Box>
    </section>
  );
};

ListBody.propTypes = {
  type: PropTypes.string,
  selector: PropTypes.func,
};

export default ListBody;
