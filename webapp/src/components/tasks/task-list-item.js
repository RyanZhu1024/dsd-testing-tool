/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {NavLink} from "react-router-dom";

const TaskListItem = ({task}) => {
	return <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`/tasks/${task.id}`}>{task.name}</NavLink>
};

TaskListItem.propTypes = {
	task: React.PropTypes.shape({
		actions: React.PropTypes.arrayOf(React.PropTypes.shape({
			id: React.PropTypes.string.isRequired,
			disable: React.PropTypes.bool
		})),
		way: React.PropTypes.number,
		createdAt: React.PropTypes.string.isRequired,
		modifiedAt: React.PropTypes.string,
		killProcess: React.PropTypes.shape({
			nodeIds: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
		}),
		name: React.PropTypes.string.isRequired
	})
};

export default TaskListItem;