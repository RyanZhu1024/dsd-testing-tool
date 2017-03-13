/**
 * Created by shuxuan on 12/03/2017.
 */
import React, {Component} from "react";
import TaskListItem from "./task-list-item.js";

export default class TaskList extends Component {

	componentWillMount () {
		this.state = {tasks: []};
		this.context.axios.get('tasks').then((res) => {
			this.setState({tasks: res.data.data});
		})
	}

	render () {
		return (
			<ul className="list-group">
				{this.state.tasks.map((task) => {
					return <TaskListItem key={task.id} task={task.value}/>
				})}
			</ul>
		)
	}
};

TaskList.contextTypes = {
	axios: React.PropTypes.func
};