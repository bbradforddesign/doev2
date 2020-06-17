import { combineReducers } from "redux";

import transactionsReducer from "./transactions";
import goalsReducer from "./goals";

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  goals: goalsReducer,
});

export default rootReducer;
