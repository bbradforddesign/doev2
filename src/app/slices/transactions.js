import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loadingTransactions: false,
  hasErrorsTransactions: false,
  transactions: [],
  totals: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    getTransactions: (state) => {
      state.loadingTransactions = true;
    },
    getTransactionsSuccess: (state, { payload }) => {
      state.transactions = payload.rows;
      state.totals = payload.categoryTotals;
      state.loadingTransactions = false;
      state.hasErrorsTransactions = false;
    },
    getTransactionsFailure: (state) => {
      state.loadingTransactions = false;
      state.hasErrorsTransactions = true;
    },
  },
});

export const {
  getTransactions,
  getTransactionsSuccess,
  getTransactionsFailure,
} = transactionsSlice.actions;

export const transactionsSelector = (state) => state.transactions;

export default transactionsSlice.reducer;

export function fetchTransactions() {
  return async (dispatch) => {
    dispatch(getTransactions());

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/transactions/all",
        {
          method: "get",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      const data = await response.json();
      dispatch(getTransactionsSuccess(data.rows));
    } catch (error) {
      dispatch(getTransactionsFailure());
    }
  };
}

export function fetchTransactionsInRange(beginning, end) {
  return async (dispatch) => {
    dispatch(getTransactions());

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/transactions/range",
        {
          method: "post",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            beginning: beginning,
            end: end,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(getTransactionsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTransactionsFailure());
    }
  };
}
