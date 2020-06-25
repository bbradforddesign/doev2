import { combineReducers } from "redux";
import transactionsReducer from "./transactions";
import goalsReducer from "./goals";
import sidebarReducer from "./sidebar";

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  goals: goalsReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
