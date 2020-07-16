import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, authSelector } from "../../slices/auth";
import { Button } from "@material-ui/core";

const Logout = () => {
  // moving auth from localstorage to redux
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {auth.loggedIn ? (
        <Button onClick={() => handleLogout()}>Logout</Button>
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </div>
  );
};

export default Logout;
