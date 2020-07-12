import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  active: "transactions",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    loadActive: (state, { payload }) => {
      state.active = payload;
    },
  },
});

export const { loadActive } = sidebarSlice.actions;

export const sidebarSelector = (state) => state.sidebar;

export default sidebarSlice.reducer;

export function setActive(barName) {
  return (dispatch) => {
    dispatch(loadActive(barName));
  };
}
