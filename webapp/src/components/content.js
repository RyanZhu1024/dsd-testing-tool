/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {Route, Switch} from "react-router-dom";
import TaskDetail from "./tasks/task-detail";
import ActionForm from "./actions/action-form";
import TaskForm from "./tasks/task-form";

const renderActionForm = (match,props) => {
	const obj = props.actions.find((act) => act.id === match.params.id);
	if (obj) {
		return <ActionForm onSubmit={props.changeAction}
		                   initialValues={obj}
		                   {...props} />
	} else {
		return <div>Not Found</div>
	}
};

export default (props) => {
	return (
		<div>
			<Switch>
				<Route path="/tasks" exact={true} render={() => <h3>Select a task from left to view</h3> } />
				<Route path="/actions" exact={true} render={() => <h3>Select an action from left to view</h3> } />
				<Route path="/tasks/new" exact={true} render={() => <TaskForm initialValues={{actions: [], verifyActions: [], killProcess: {nodeIds: []}}} onSubmit={(form) => props.createTask(form, props.history)} {...props} />}  />
				<Route path="/actions/new" exact={true} render={() => <ActionForm initialValues={{repeat: 1, delay: 0}} onSubmit={(form) => props.createAction(form, props.history)} {...props} />}  />
				<Route path="/tasks/:id/edit" render={({match}) => <TaskForm onSubmit={props.changeTask} initialValues={props.tasks.find((t) => t.id === match.params.id)} {...props} /> }/>
				<Route path="/tasks/:id" render={({match}) => <TaskDetail task={props.tasks.find((t) => t.id === match.params.id)} {...props}/> }/>
				{/*Don't overwrite handleSubmit in the props passed to the Form component. redux form depends on the handleSubmit event to call onSubmit. */}
				<Route path="/actions/:id" render={({match}) => renderActionForm(match, props) } />
			</Switch>
		</div>
	)
}