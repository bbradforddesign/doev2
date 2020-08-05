import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useSelector } from "react-redux";
import { transactionsSelector } from "../../slices/transactions";

import { Typography, IconButton, Button, Box } from "@material-ui/core";
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

const TransactionBar = () => {
  const classes = useStyles();

  const transactions = useSelector(transactionsSelector);

  return (
    <section className={classes.root}>
      <Box className={classes.head}>
        <Typography variant="h2" align="center">
          Transactions
        </Typography>
      </Box>
      <Box className={classes.body}>
        <ul className={classes.scrollList}>
          {transactions.monthly.length > 0 ? (
            transactions.monthly.map((e) => (
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
                      {e.category} -{" "}
                      {moment(e.created_date).format("MM/DD/YYYY")}
                    </strong>
                  </Typography>
                  <Link
                    to={{
                      pathname: "/edit/transaction",
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
            ))
          ) : (
            <Typography>Record Transactions</Typography>
          )}
        </ul>
        <Link to="/create/transaction">
          <Button variant="contained" color="primary" size="large">
            New
          </Button>
        </Link>
      </Box>
    </section>
  );
};

export default TransactionBar;
