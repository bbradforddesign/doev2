import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import apiMethods from "../../utils/TransactionApi";
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
  // the form container
  formModal: {
    padding: "2%",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  // fades out everything outside the form
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

  // store input before sending to db
  const [item, setItem] = useState({
    category: "",
    amount: 0,
    description: "",
    date: "",
  });

  const routerProps = props.location.props;

  // interact with the api
  const handleCreate = async () => {
    apiMethods.Create(item.category, item.description, item.amount, item.date);
  };
  const handleUpdate = () => {
    apiMethods.Update(
      routerProps.id,
      item.category,
      item.description,
      item.amount,
      item.date
    );
  };
  const handleDelete = () => {
    apiMethods.Delete(routerProps.id);
  };

  // control inputs
  const handleItem = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  // if editing, need to use existing values as defaults.
  useEffect(() => {
    if (routerProps) {
      setItem({
        category: routerProps.category,
        amount: routerProps.amount,
        description: routerProps.description,
        date: routerProps.date,
      });
    }
  }, [routerProps]);

  // redirects to current page
  const handleSubmit = () => {
    props.history.replace("/transaction");
    window.location.reload();
  };

  // big list of categories to sort transactions. Need to simplify?
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
          {routerProps ? "Edit Expense" : "New Expense"}
        </Typography>
        <TextField
          id="date"
          label="Date"
          type="date"
          name="date"
          value={moment(item.date).format("YYYY-MM-DD")}
          onChange={handleItem}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth={true}
          required
        />
        <TextField
          label="Category"
          id="category"
          select
          name="category"
          value={item.category}
          onChange={handleItem}
          placeholder={routerProps ? routerProps.category : "Category"}
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
          label="Description"
          name="description"
          onChange={handleItem}
          placeholder={"Description"}
          defaultValue={routerProps && routerProps.description}
          margin="normal"
          fullWidth={true}
        />
        <TextField
          variant="outlined"
          label="Amount"
          type="number"
          name="amount"
          onChange={handleItem}
          error={item.amount <= 0 ? true : false}
          helperText={item.amount <= 0 && "Amount must be greater than 0"}
          placeholder={"Amount"}
          defaultValue={routerProps && routerProps.amount}
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
              pathname: "/transaction",
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

export default withRouter(TransactionForm);
