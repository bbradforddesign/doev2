import React from "react";

import Sidebar from "./Sidebar";

import { Box } from "@material-ui/core";
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
      alignItems: "center",
      height: "90%",
      marginTop: "0",
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
  return (
    <Box className={classes.root}>
      <Sidebar />
    </Box>
  );
};

export default Record;
