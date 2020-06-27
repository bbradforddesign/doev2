import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Box, Typography, TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, authSelector } from "../../slices/auth";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "70vh",
  },
  formBody: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formTextInput: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    margin: "5%",
  },
  formButtons: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    margin: "5%",
  },
  formHeader: {
    margin: "10%",
  },
});

const LoginForm = () => {
  // styles
  const classes = useStyles();

  // moving auth from localstorage to redux
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const [creds, setCreds] = useState();

  const handleLogin = () => {
    dispatch(loginUser(creds.email, creds.password));
  };

  // creates new user in db. Automatically logs on with new jwt
  const handleRegister = () => {
    dispatch(registerUser(creds.email, creds.password));
  };

  const handleCreds = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box className={classes.formContainer}>
      <Paper className={classes.formBody}>
        {auth.loggedIn ? (
          <Redirect to={{ pathname: "/main" }} />
        ) : (
          <>
            <div className={classes.formHeader}>
              <Typography variant="h3">Welcome!</Typography>
              <Typography variant="subtitle1" align="center">
                Let's get started.
              </Typography>
            </div>
            <div className={classes.formTextInput}>
              <TextField
                type="text"
                label="Email"
                name="email"
                variant="outlined"
                autoComplete="username"
                onChange={handleCreds}
                style={{ marginBottom: "10%" }}
              />
              <TextField
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                autoComplete="new-password"
                onChange={handleCreds}
                style={{ marginBottom: "10%" }}
              />
            </div>
            <div className={classes.formButtons}>
              <Button
                variant="text"
                color="primary"
                onClick={() => handleRegister()}
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin()}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LoginForm;
