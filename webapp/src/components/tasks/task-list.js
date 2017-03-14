/**
 * Created by shuxuan on 12/03/2017.
 */
import React, {Component} from "react";
import TaskListItem from "./task-list-item.js";

export default class TaskList extends Component {

	componentWillMount () {
		this.props.loadTasks();
	}

	render () {
		return (
			<ul className="list-group">
				{this.props.tasks.map((task) => {
					return <TaskListItem key={task.id} task={task.value}/>
				})}
			</ul>
		)
	}
};

TaskList.contextTypes = {
	axios: React.PropTypes.func
};