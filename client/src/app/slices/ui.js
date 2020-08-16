import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  month: moment().format("YYYY-MM-DD"),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loadMonth: (state, { payload }) => {
      state.month = payload;
    },
  },
});

export const { loadMonth } = uiSlice.actions;

export const uiSelector = (state) => state.ui;

export default uiSlice.reducer;

export function incMonth(month) {
  return (dispatch) => {
    dispatch(loadMonth(moment(month).add(1, "months").format("YYYY-MM-DD")));
  };
}

export function decMonth(month) {
  return (dispatch) => {
    dispatch(
      loadMonth(moment(month).subtract(1, "months").format("YYYY-MM-DD"))
    );
  };
}

export function resetMonth() {
  return (dispatch) => {
    dispatch(loadMonth(moment()));
  };
}
