import { combineReducers } from "redux";
import transactionsReducer from "./transactions";
import goalsReducer from "./goals";
import uiReducer from "./ui";
import authReducer from "./auth";

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  goals: goalsReducer,
  ui: uiReducer,
  auth: authReducer,
});

export default rootReducer;
