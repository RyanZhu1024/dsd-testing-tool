import {combineReducers} from "redux";
import tasks from "./tasks.js";
import visibilityFilter from "./visibilityFilter.js";
import taskActions from "./task-actions";
import nodesToKill from "./nodes-to-kill";

export default combineReducers({
  tasks,
  visibilityFilter,
	taskActions,
	nodesToKill
});
