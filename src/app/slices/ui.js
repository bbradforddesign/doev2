import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  sidebar: "transactions",
  graph: "pie",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loadSidebar: (state, { payload }) => {
      state.sidebar = payload;
    },
    loadGraph: (state, { payload }) => {
      state.graph = payload;
    },
  },
});

export const { loadSidebar, loadGraph } = uiSlice.actions;

export const uiSelector = (state) => state.ui;

export default uiSlice.reducer;

export function setSidebar(barName) {
  return (dispatch) => {
    dispatch(loadSidebar(barName));
  };
}

export function setGraph(graphName) {
  return (dispatch) => {
    dispatch(loadGraph(graphName));
  };
}
