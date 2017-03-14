/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import TaskListContainer from "../containers/task-list-container.js";
export default (props) => {
	return (
		<Router>
			<Route path="/" component={TaskListContainer} />
		</Router>
	)
}