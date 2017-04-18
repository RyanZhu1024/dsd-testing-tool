/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {Route, Switch} from "react-router-dom";
import TaskList from "./tasks/task-list.js";
import ActionList from "./actions/action-list";
import NodeList from './nodes/node-list';
export default (props) => {
	return (
		<Switch>
			<Route path="/tasks" render={() => <TaskList {...props} />} />
			<Route path="/actions" render={() => <ActionList {...props} />} />
			<Route path="/nodes" render={() => <NodeList {...props} />} />
		</Switch>
	)
}