import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { filterReducer } from "./reducers/filter";
import { tasksReducer } from "./reducers/tasks";

const rootRedcuer = combineReducers({
  filter: filterReducer,
  tasks: tasksReducer,
});

const store = createStore(rootRedcuer, applyMiddleware(thunk));

export default store;
