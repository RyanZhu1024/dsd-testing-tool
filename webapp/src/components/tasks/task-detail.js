/**
 * Created by shuxuan on 15/03/2017.
 */
import React, {Component} from "react";
import BasicInfo from "./task-basic-info.js";
import ActionThumbnail from "../actions/action-thumbnail.js";
import NodeThumbnail from "../nodes/node-thumbnail";
import CollapseComponent from "../collapse-component.js";

export default class TaskDetail extends Component {


	componentWillReceiveProps(nextProps) {
		if (this.props.task !== nextProps.task) {
			console.log(nextProps.task);
			this.props.loadActionsByIds(nextProps.task.actions);
			this.props.loadNodesToKill(nextProps.task.killProcess);
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
		return (this.props.task && this.props.taskActions) ? <CollapseComponent components={components} /> : null;
	}
}