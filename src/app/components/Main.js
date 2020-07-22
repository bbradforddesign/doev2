import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import {
  fetchMonthly,
  fetchAll,
  transactionsSelector,
} from "../slices/transactions";
import {
  setSidebar,
  uiSelector,
  incMonth,
  decMonth,
  resetMonth,
  loadSide,
} from "../slices/ui";
import { fetchGoals, goalsSelector } from "../slices/goals";
import { authSelector } from "../slices/auth";
import {
  Button,
  IconButton,
  ButtonGroup,
  Box,
  Paper,
  Typography,
  Slide,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReplayIcon from "@material-ui/icons/Replay";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import TransactionBar from "./Sidebar/TransactionBar";
import GoalBar from "./Sidebar/GoalBar";

import PieChart from "./Graphs/PieChart";
import CompoundBar from "./Graphs/CompoundBar";

const useStyles = makeStyles({
  contentBox: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  sidebar: {
    width: 300,
    height: "80vh",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  graphBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "2%",
    marginLeft: "5%",
    width: 600,
  },
  toggleGroup: {},
});

const Main = () => {
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const { monthly, responseCode } = useSelector(transactionsSelector);
  const active = useSelector(uiSelector);
  const { goals } = useSelector(goalsSelector);
  const auth = useSelector(authSelector);

  // on mount, fetch transactions to render
  useEffect(() => {
    if (auth.loggedIn === true) {
      dispatch(fetchMonthly(active.month));
      dispatch(fetchGoals());
      dispatch(fetchAll());
    }
  }, [dispatch, auth, active.month]);

  const renderTransactions = () => {
    if (responseCode !== 200) {
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "80vh",
          }}
        >
          {responseCode !== 200 ? (
            <h1>Error {responseCode} :(</h1>
          ) : (
            <h1>Redirecting...</h1>
          )}
          {responseCode === 400 ? (
            <p>Your session has expired. Please log out and sign back in.</p>
          ) : (
            <p>
              An error has occurred with our system. Please try again later!
            </p>
          )}
        </Box>
      );
    }
    return (
      <>
        {monthly && (
          <Box className={classes.contentBox}>
            <Slide
              direction="right"
              in={active.viewSide === true}
              style={active.viewSide === false && { width: 0 }}
            >
              <Box className={classes.sidebar}>
                {active.sidebar === "transactions" ? (
                  // should filter by current month
                  <TransactionBar transactions={monthly} month={active.month} />
                ) : (
                  <GoalBar goals={goals} />
                )}
                <ButtonGroup className={classes.toggleGroup}>
                  <Button
                    variant={
                      active.sidebar === "transactions"
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => dispatch(setSidebar("transactions"))}
                  >
                    Transactions
                  </Button>
                  <Button
                    variant={
                      active.sidebar === "goals" ? "contained" : "outlined"
                    }
                    onClick={() => dispatch(setSidebar("goals"))}
                  >
                    Goals
                  </Button>
                </ButtonGroup>
              </Box>
            </Slide>
            <IconButton
              onClick={() => dispatch(loadSide())}
              style={{ alignSelf: "flex-start", marginLeft: "0" }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                width: "60vw",
              }}
            >
              <Paper className={classes.graphBox}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    marginBottom: "1vh",
                  }}
                >
                  <Typography variant="h3">
                    {moment(active.month).format("MMM YYYY")}
                  </Typography>
                  <ButtonGroup>
                    <IconButton
                      onClick={() => dispatch(decMonth(active.month))}
                    >
                      <ArrowBackIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={() => dispatch(resetMonth())}>
                      <ReplayIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={() => dispatch(incMonth(active.month))}
                    >
                      <ArrowForwardIcon fontSize="large" />
                    </IconButton>
                  </ButtonGroup>
                </Box>
                <Box style={{ width: "90%", margin: "0 0 10% 0" }}>
                  <CompoundBar month={active.month} />
                </Box>
                <PieChart />
              </Paper>
            </Box>
          </Box>
        )}
      </>
    );
  };

  return <>{auth.loggedIn ? renderTransactions() : <Redirect to="/login" />}</>;
};

export default Main;
