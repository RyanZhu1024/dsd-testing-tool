/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";

const TaskListItem = ({task}) => {
	return <li className="list-group-item list-group-item-action">
		{task.name}
	</li>
};

TaskListItem.propTypes = {
	task: React.PropTypes.shape({
		caseActions: React.PropTypes.shape({
			actions: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
			way: React.PropTypes.number.isRequired
		}).isRequired,
		createdAt: React.PropTypes.string.isRequired,
		modifiedAt: React.PropTypes.string,
		killProcess: React.PropTypes.shape({
			nodeIds: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
		}),
		name: React.PropTypes.string.isRequired
	})
};

export default TaskListItem;