import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, authSelector } from "../../slices/auth";

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
        <button onClick={() => handleLogout()}>Logout</button>
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </div>
  );
};

export default Logout;
