import { combineReducers } from "redux";
import transactionsReducer from "./transactions";
import goalsReducer from "./goals";
import sidebarReducer from "./sidebar";
import authReducer from "./auth";

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  goals: goalsReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
});

export default rootReducer;
