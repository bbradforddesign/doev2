import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  fetchTransactions,
  transactionsSelector,
} from "../slices/transactions";
import { setActive, sidebarSelector } from "../slices/sidebar";
import { fetchGoals, goalsSelector } from "../slices/goals";
import { authSelector } from "../slices/auth";
import { IconButton, Box, Slide } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import { makeStyles } from "@material-ui/core/styles";
import Calculator from "./Analysis/Calculator";
import TransactionBar from "./Transactions/TransactionBar";
import GoalBar from "./Goals/GoalBar";

const useStyles = makeStyles({
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "90vw",
    height: "80vh",
  },
  sidebarToggle: {
    width: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "70vh",
    paddingTop: "5vh",
  },
  sidebarDivider: {
    width: "80%",
    border: "1px solid #AAA",
  },
});

const Main = () => {
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const {
    transactions,
    loadingTransactions,
    hasErrorsTransactions,
  } = useSelector(transactionsSelector);
  const active = useSelector(sidebarSelector);
  const { goals, loading, hasErrors } = useSelector(goalsSelector);
  const auth = useSelector(authSelector);

  // on mount, fetch transactions to render
  useEffect(() => {
    if (auth.loggedIn === true) {
      dispatch(fetchTransactions());
      dispatch(fetchGoals());
    }
  }, [dispatch, auth]);

  // date filter
  const filterMonth = (array, date) => {
    return array.filter(
      (e) =>
        moment(e.created_date ? e.created_date : e.date).format("MM/YYYY") ===
        moment(date).format("MM/YYYY")
    );
  };

  const renderTransactions = () => {
    if (loadingTransactions) return <p>Loading Transactions</p>;
    if (hasErrorsTransactions) return <p>Unable to Retrieve Transactions</p>;
    if (loading) return <p>Loading Goals</p>;
    if (hasErrors) return <p>Unable to Retrieve Goals</p>;

    console.log(goals);
    console.log(transactions);
    return (
      <>
        {transactions && (
          <Box className={classes.contentBox}>
            <Slide in={active.active !== ""} direction="right" unmountOnExit>
              {active.active === "transactions" ? (
                // should filter by current month
                <TransactionBar
                  transactions={filterMonth(transactions, moment())}
                />
              ) : (
                <GoalBar goals={filterMonth(goals, moment())} />
              )}
            </Slide>
            <Box className={classes.sidebarToggle}>
              <IconButton
                onClick={
                  active.active === "transactions"
                    ? () => {
                        dispatch(setActive(""));
                      }
                    : () => {
                        dispatch(setActive("transactions"));
                      }
                }
              >
                <AttachMoneyIcon fontSize="large" />
              </IconButton>
              <hr className={classes.sidebarDivider} />
              <IconButton
                onClick={
                  active.active === "goals"
                    ? () => {
                        dispatch(setActive(""));
                      }
                    : () => {
                        dispatch(setActive("goals"));
                      }
                }
              >
                <TrackChangesIcon fontSize="large" />
              </IconButton>
            </Box>
            <Calculator
              transactions={filterMonth(transactions, moment())}
              goals={filterMonth(goals, moment())}
            />
          </Box>
        )}
      </>
    );
  };

  return <>{auth.loggedIn ? renderTransactions() : <p>Please log in.</p>}</>;
};

export default Main;
