/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {NavLink, Route, Switch} from "react-router-dom";

const TaskListItem = ({task}) => {
	return <Switch>
			<Route path="/tasks/:id/edit" exact={true} render={() => <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`/tasks/${task.id}/edit`}>{task.name}</NavLink>}/>
			<Route path="/tasks/:id/results" exact={true} render={() => <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`/tasks/${task.id}/results`}>{task.name}</NavLink>}/>
			<Route path="/tasks/:id/results/verify" exact={true} render={() => <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`/tasks/${task.id}/results/verify`}>{task.name}</NavLink>}/>
			<Route path="/tasks" render={() => <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`/tasks/${task.id}`}>{task.name}</NavLink>}/>
		</Switch>
};

TaskListItem.propTypes = {
	task: React.PropTypes.shape({
		actions: React.PropTypes.arrayOf(React.PropTypes.string.isRequired),
		way: React.PropTypes.number,
		createdAt: React.PropTypes.string.isRequired,
		modifiedAt: React.PropTypes.string,
		nodeIdsToKill: React.PropTypes.arrayOf(React.PropTypes.string.isRequired),
		name: React.PropTypes.string.isRequired
	})
};

export default TaskListItem;