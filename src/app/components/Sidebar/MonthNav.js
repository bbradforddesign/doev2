import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { uiSelector, incMonth, decMonth, resetMonth } from "../../slices/ui";
import { Typography, ButtonGroup, IconButton, Paper } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReplayIcon from "@material-ui/icons/Replay";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { makeStyles } from "@material-ui/core/styles";

// styling and breakpoints
const useStyles = makeStyles((theme) => ({
  theme,
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: "0 2%",
    width: "96%",
    margin: "2vh 0",
  },
}));

const MonthNav = () => {
  const classes = useStyles();

  const active = useSelector(uiSelector);
  const dispatch = useDispatch();
  return (
    <Paper className={classes.root}>
      <Typography variant="h2" align="center">
        {moment(active.month).format("MMM YYYY")}
      </Typography>
      <ButtonGroup>
        <IconButton onClick={() => dispatch(decMonth(active.month))}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => dispatch(resetMonth())}>
          <ReplayIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => dispatch(incMonth(active.month))}>
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </ButtonGroup>
    </Paper>
  );
};

export default MonthNav;
