import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  sidebar: "transactions",
  viewSide: true,
  month: moment().format("YYYY-MM-DD"),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loadSidebar: (state, { payload }) => {
      state.sidebar = payload;
    },
    loadMonth: (state, { payload }) => {
      state.month = payload;
    },
    loadSide: (state) => {
      state.viewSide = !state.viewSide;
    },
  },
});

export const { loadSidebar, loadMonth, loadSide } = uiSlice.actions;

export const uiSelector = (state) => state.ui;

export default uiSlice.reducer;

export function setSidebar(barName) {
  return (dispatch) => {
    dispatch(loadSidebar(barName));
  };
}

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