import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  loadingTransactions: false,
  hasErrorsTransactions: false,
  all: [],
  monthlyTotals: [],
  monthly: [],
  categoryTotals: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    getTransactions: (state) => {
      state.loadingTransactions = true;
    },
    getMonthly: (state, { payload }) => {
      state.monthly = payload.rows;
      state.categoryTotals = payload.categoryTotals;
    },
    getAll: (state, { payload }) => {
      state.all = payload.rows;
      state.monthlyTotals = payload.monthlyTotals;
    },
    getTransactionsSuccess: (state) => {
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
  getAll,
  getMonthly,
} = transactionsSlice.actions;

export const transactionsSelector = (state) => state.transactions;

export default transactionsSlice.reducer;

export function fetchAll() {
  return async (dispatch) => {
    dispatch(getTransactions());
    try {
      const response = await fetch(`/api/v1/transactions/all`, {
        method: "get",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const data = await response.json();
      dispatch(getAll(data));
      dispatch(getTransactionsSuccess());
    } catch (error) {
      dispatch(getTransactionsFailure());
    }
  };
}

export function fetchMonthly(month) {
  return async (dispatch) => {
    dispatch(getTransactions());
    try {
      const response = await fetch(`/api/v1/transactions/range`, {
        method: "post",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          beginning: moment(month).startOf("month"),
          end: moment(month).endOf("month"),
        }),
      });
      const data = await response.json();
      dispatch(getMonthly(data));
      dispatch(getTransactionsSuccess());
    } catch (error) {
      dispatch(getTransactionsFailure());
    }
  };
}