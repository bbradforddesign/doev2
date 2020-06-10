import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  transactions: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    getTransactions: (state) => {
      state.loading = true;
    },
    getTransactionsSuccess: (state, { payload }) => {
      state.transactions = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getTransactionsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
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
