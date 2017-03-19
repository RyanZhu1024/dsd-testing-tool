/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {Route, Switch} from "react-router-dom";
import TaskDetail from "./tasks/task-detail";
import ActionForm from "./actions/action-form";
export default (props) => {
	return (
		<div>
			<Switch>
				<Route path="/tasks" exact={true} render={() => <h3>Select a task from left to view</h3> } />
				<Route path="/actions" exact={true} render={() => <h3>Select an action from left to view</h3> } />
				<Route path="/tasks/:id" render={({match}) => <TaskDetail task={props.tasks.find((t) => t.id === match.params.id)} {...props}/> }/>
				{/*Don't overwrite handleSubmit in the props passed to the Form component. redux form depends on the handleSubmit event to call onSubmit. */}
				<Route path="/actions/:id" render={({match}) => <ActionForm onSubmit={props.changeAction} initialValues={props.actions.find((act) => act.id === match.params.id)} {...props} />} />
			</Switch>
		</div>
	)
}