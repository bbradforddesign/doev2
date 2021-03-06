import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import apiMethods from "../../utils/GoalApi";
import moment from "moment";
import {
  TextField,
  MenuItem,
  Paper,
  Button,
  ButtonGroup,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  buttonLink: {
    textDecoration: "none",
  },
  formModal: {
    padding: "2%",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formBackground: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(200,200,200,.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const GoalForm = (props) => {
  const classes = useStyles();

  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "",
    amount: 0,
    date: moment().format("YYYY/MM/DD"),
  });

  const routerProps = props.location.props;

  const handleCreate = () => {
    apiMethods.Create(item.category, item.amount, item.date);
  };
  const handleUpdate = () => {
    apiMethods.Update(routerProps.id, item.category, item.amount, item.date);
  };
  const handleDelete = () => {
    apiMethods.Delete(routerProps.id);
  };
  const handleItem = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (routerProps) {
      setItem({
        category: routerProps.category,
        amount: routerProps.amount,
      });
    }
  }, [routerProps]);

  // redirects to current page
  const handleSubmit = () => {
    props.history.replace("/goal");
    window.location.reload();
  };

  const categoryOptions = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Clothing",
    "Healthcare",
    "Insurance",
    "Household Supplies",
    "Personal",
    "Debt",
    "Retirement",
    "Education",
    "Savings",
    "Gifts/Donations",
    "Entertainment",
  ];

  return (
    <Box className={classes.formBackground}>
      <Paper className={classes.formModal}>
        <Typography variant="h2">
          {routerProps ? "Edit Goal" : "New Goal"}
        </Typography>
        <TextField
          label="Category"
          id="category"
          select
          name="category"
          value={item.category}
          onChange={handleItem}
          placeholder={routerProps ? routerProps.category : "Category"}
          className={classes.formField}
          margin="normal"
          fullWidth={true}
          required
        >
          {categoryOptions.map((e) => (
            <MenuItem value={e} key={e}>
              {e}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Amount"
          type="number"
          name="amount"
          onChange={handleItem}
          value={item.amount}
          error={item.amount < 1 ? true : false}
          helperText={item.amount < 1 && "Amount must be greater than 0"}
          placeholder={routerProps ? String(routerProps.amount) : "Amount"}
          className={classes.formField}
          margin="normal"
          fullWidth={true}
          required
        />
        <ButtonGroup
          variant="outlined"
          color="primary"
          style={{ marginTop: "10%" }}
        >
          <Link
            to={{
              pathname: "/goal",
            }}
            className={classes.buttonLink}
          >
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </Link>
          {(routerProps || (item.amount && item.category)) && (
            <Button
              onClick={() => {
                routerProps ? handleUpdate() : handleCreate();
                handleSubmit();
              }}
            >
              Save
            </Button>
          )}

          {routerProps && (
            <Button
              onClick={() => {
                handleDelete();
                handleSubmit();
              }}
            >
              Delete
            </Button>
          )}
        </ButtonGroup>
      </Paper>
    </Box>
  );
};

export default withRouter(GoalForm);
