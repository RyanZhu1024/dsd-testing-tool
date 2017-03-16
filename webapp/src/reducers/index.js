import {combineReducers} from "redux";
import tasks from "./tasks.js";
import visibilityFilter from "./visibilityFilter.js";
import taskActions from "./task-actions";

export default combineReducers({
  tasks,
  visibilityFilter,
	taskActions
});
