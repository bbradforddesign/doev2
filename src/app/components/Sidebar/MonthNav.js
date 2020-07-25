import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { uiSelector, incMonth, decMonth, resetMonth } from "../../slices/ui";
import { Typography, ButtonGroup, IconButton, Box } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReplayIcon from "@material-ui/icons/Replay";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { makeStyles } from "@material-ui/core/styles";

// styling and breakpoints
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DDD",
    flexDirection: "column",
    marginBottom: "5vh",
    padding: "2%",
    width: "120px",
  },
}));

const MonthNav = () => {
  const classes = useStyles();

  const active = useSelector(uiSelector);
  const dispatch = useDispatch();
  return (
    <Box className={classes.root}>
      <Typography variant="h3" align="center">
        {moment(active.month).format("MMM YYYY")}
      </Typography>
      <ButtonGroup orientation="vertical">
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
    </Box>
  );
};

export default MonthNav;
