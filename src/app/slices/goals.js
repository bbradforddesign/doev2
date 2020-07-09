import { createSlice } from "@reduxjs/toolkit";

/**
 * NOTE:
 * Have to format date here, as date formatting isn't working on backend. Should fix there?
 */

export const initialState = {
  loading: false,
  hasErrors: false,
  goals: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    getGoals: (state) => {
      state.loading = true;
    },
    getGoalsSuccess: (state, { payload }) => {
      state.goals = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getGoalsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getGoals,
  getGoalsSuccess,
  getGoalsFailure,
} = goalsSlice.actions;

export const goalsSelector = (state) => state.goals;

export default goalsSlice.reducer;

export function fetchGoals() {
  return async (dispatch) => {
    dispatch(getGoals());

    try {
      const response = await fetch("http://localhost:3001/api/v1/goals/all", {
        method: "get",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.status === 400) {
        dispatch(getGoalsFailure());
      } else {
        const data = await response.json();
        dispatch(getGoalsSuccess(data.rows));
      }
    } catch (error) {
      dispatch(getGoalsFailure());
    }
  };
}
