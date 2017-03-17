import {combineReducers} from "redux";
import tasks from "./tasks.js";
import actions from "./actions";
import visibilityFilter from "./visibilityFilter.js";
import taskActions from "./task-actions";
import nodesToKill from "./nodes-to-kill";
import selectedAction from "./select-action";
import {reducer as formReducer} from "redux-form";

export default combineReducers({
	actions,
  tasks,
  visibilityFilter,
	taskActions,
	nodesToKill,
	selectedAction,
	form: formReducer
});
