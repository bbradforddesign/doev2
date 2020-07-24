import React from "react";

import { useSelector } from "react-redux";
import { uiSelector } from "../slices/ui";

import Sidebar from "./Sidebar";
import CompoundBar from "./Graphs/CompoundBar";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// styling and breakpoints
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.between("sm", "md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
    },
  },
}));

const Record = () => {
  const classes = useStyles();
  const active = useSelector(uiSelector);
  return (
    <Paper className={classes.root}>
      <Sidebar />
      <CompoundBar month={active.month} />
    </Paper>
  );
};

export default Record;
