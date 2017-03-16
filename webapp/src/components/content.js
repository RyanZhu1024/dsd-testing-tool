/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {Route, Switch} from "react-router-dom";
import TaskDetail from "./tasks/task-detail";
export default (props) => {
	return (
		<div>
			<Switch>
				<Route path="/tasks" exact={true} render={() => <h3>Select a task from left to view</h3> } />
				<Route path="/tasks/:id" render={({match}) => <TaskDetail tasks={props.tasks} id={match.params.id}/> }/>
			</Switch>
		</div>
	)
}