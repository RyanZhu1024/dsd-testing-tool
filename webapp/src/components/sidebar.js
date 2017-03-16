/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {Route} from "react-router-dom";
import TaskList from "./tasks/task-list.js";
export default (props) => {
	return (
		<Route path="/tasks" render={() => <TaskList {...props} />} />
	)
}