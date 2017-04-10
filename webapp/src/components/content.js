/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {Route, Switch} from "react-router-dom";
import TaskDetail from "./tasks/task-detail";
import ActionForm from "./actions/action-form";
import TaskForm from "./tasks/task-form";
import AlertComponent from './alert-component';
import TaskActionsResults from './tasks/task-actions-results';
import TaskVerifyResults from './tasks/task-verify-results';

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

const initialTask = (task) => {
	if (task) {
		task.actions = task.actions || [];
		task.verifyActions = task.verifyActions || [];
		task.nodeIdsToKill = task.nodeIdsToKill || [];
		return task;
	} else {
		return {actions: [], verifyActions: [], nodeIdsToKill: []};
	}
};

export default (props) => {
	const {alert, closeAlert} = props;
	return (
		<div>
			<AlertComponent alert={alert} closeAlert={closeAlert} />
			<Switch>
				<Route path="/tasks" exact={true}
				       render={() => <h3>Select a task from left to view</h3> } />
				<Route path="/actions" exact={true}
				       render={() => <h3>Select an action from left to view</h3> } />
				<Route path="/tasks/new" exact={true}
				       render={() => <TaskForm initialValues={initialTask(undefined)}
				                               onSubmit={(form) => props.createTask(form, props.history)}
				                               {...props} />}
				/>
				<Route path="/actions/new" exact={true}
				       render={() => <ActionForm initialValues={{repeat: 1, delay: 0}}
				                                 onSubmit={(form) => props.createAction(form, props.history)}
				                                 {...props} />}
				/>
				<Route path="/tasks/:id/edit"
				       render={({match}) => <TaskForm onSubmit={props.changeTask}
				                                      initialValues={initialTask(props.tasks.find((t) => t.id === match.params.id))}
				                                      {...props} /> }
				/>
				<Route exact={true} path="/tasks/:id/results"
					   render={({match}) => <TaskActionsResults task={props.tasks.find((t) => t.id === match.params.id)} {...props}/> }
				/>
				<Route exact={true} path="/tasks/:id/results/verify"
					   render={({match}) => <TaskVerifyResults task={props.tasks.find((t) => t.id === match.params.id)} {...props} /> }
				/>
				<Route path="/tasks/:id"
				       render={({match}) => <TaskDetail task={props.tasks.find((t) => t.id === match.params.id)}
				                                        {...props}/> }
				/>
				{/*Don't overwrite handleSubmit in the props passed to the Form component. redux form depends on the handleSubmit event to call onSubmit. */}
				<Route path="/actions/:id" render={({match}) => renderActionForm(match, props) } />
			</Switch>
		</div>
	)
}