/**
 * Created by shuxuan on 12/03/2017.
 */
import React, {Component} from "react";

export default class TaskListItem extends Component {
	render() {
		return <li className="list-group-item">
			{this.props.task.name}
		</li>
	}
}