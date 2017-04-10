/**
 * Created by shuxuan on 15/03/2017.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import BasicInfo from "./task-basic-info.js";
import ActionThumbnail from "../actions/action-thumbnail.js";
import NodeThumbnail from "../nodes/node-thumbnail";
import CollapseComponent from "../collapse-component.js";

export default class TaskDetail extends Component {

	componentWillMount () {
		const {task} = this.props;
		console.log(`TaskDetail componentWillMount :${task}`);
		if (task) {
			this.props.loadActionsByIds(task.actions);
			this.props.loadNodesToKill(task.nodeIdsToKill);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.task !== nextProps.task) {
			console.log(`task componentWillReceiveProps :${nextProps.task}`);
			this.props.loadActionsByIds(nextProps.task.actions);
			this.props.loadNodesToKill(nextProps.task.nodeIdsToKill);
		}
	}

	render () {
		const components = [
			{
				title: "View Basic Information",
				component: BasicInfo,
				task: this.props.task
			},
			{
				title: "View Actions Information",
				component: ActionThumbnail,
				actions: this.props.taskActions
			},
			{
				title: "View Nodes To Kill Information",
				component: NodeThumbnail,
				nodes: this.props.nodesToKill
			}
		];
		return (this.props.task && this.props.taskActions) ?
			<div>
				<CollapseComponent components={components} />
				<div className="btn-group" role="group">
					<Link to={`/tasks/${this.props.task.id}/edit`} className="btn btn-primary" role="button" aria-pressed="true">Update</Link>
					<Link to={`/tasks/${this.props.task.id}/results`} className="btn btn-secondary" role="button" aria-pressed="true">Action Results</Link>
					<Link to={`/tasks/${this.props.task.id}/results/verify`} className="btn btn-secondary" role="button" aria-pressed="true">Verify Action Results</Link>
					<button onClick={() => this.props.handleDelete(this.props.task.id, this.props.history)}
					        className="btn btn-danger" type="button">Delete</button>
					<button onClick={() => this.props.runTask(this.props.task.id)}
					        className="btn btn-info" type="button">Run Task</button>
					<button onClick={() => this.props.verifyTask(this.props.task.id)}
							className="btn btn-secondary" type="button">Verify Task</button>
				</div>
			</div>
			: null;
	}
}