import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import apiMethods from "../../utils/TransactionApi";
import {
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Button,
  ButtonGroup,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  formField: {
    marginBottom: "5%",
  },
  buttonLink: {
    textDecoration: "none",
  },
  formModal: {
    padding: "3%",
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

const TransactionForm = (props) => {
  const classes = useStyles();

  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "Income",
    amount: 0,
    description: "",
  });

  const routerProps = props.location.props;

  const handleCreate = async () => {
    apiMethods.Create(item.category, item.description, item.amount, item.type);
  };
  const handleUpdate = () => {
    apiMethods.Update(
      routerProps.id,
      item.category,
      item.description,
      item.amount,
      item.type
    );
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

  // redirects to main page; need to add props to keep sidebar open persistently.
  const handleSubmit = () => {
    props.history.replace("/main");
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
        <h2>{routerProps ? routerProps.description : "New Transaction"}</h2>
        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="Type"
            name="type"
            value={item.type}
            onChange={handleItem}
            row
            required
            className={classes.formField}
          >
            <FormControlLabel
              value="expense"
              control={<Radio />}
              label="Expense"
              checked={
                props.type === "expense" || item.type === "expense"
                  ? true
                  : false
              }
            />
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
              checked={
                props.type === "income" || item.type === "income" ? true : false
              }
            />
          </RadioGroup>
          {item.type === "expense" ? (
            <>
              <TextField
                label="Category"
                id="category"
                select
                name="category"
                value={item.category}
                onChange={handleItem}
                placeholder={routerProps ? routerProps.category : "Category"}
                className={classes.formField}
                required
              >
                {categoryOptions.map((e) => (
                  <MenuItem value={e} key={e}>
                    {e}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : null}
          <TextField
            variant="outlined"
            label="Description"
            name="description"
            onChange={handleItem}
            placeholder={routerProps ? routerProps.description : "Description"}
            className={classes.formField}
          />
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
            required
          />
          <ButtonGroup variant="outlined" color="primary">
            <Link
              to={{
                pathname: "/main",
              }}
              className={classes.buttonLink}
            >
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </Link>
            {(routerProps || (item.amount && item.type && item.category)) && (
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
        </FormControl>
      </Paper>
    </Box>
  );
};

export default withRouter(TransactionForm);
