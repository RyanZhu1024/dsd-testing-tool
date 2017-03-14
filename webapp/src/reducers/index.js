import {combineReducers} from "redux";
import tasks from "./tasks.js";
import visibilityFilter from "./visibilityFilter.js";

export default combineReducers({
  tasks,
  visibilityFilter
});
