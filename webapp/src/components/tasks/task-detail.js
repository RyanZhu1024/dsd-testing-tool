/**
 * Created by shuxuan on 15/03/2017.
 */
import React from "react";
import BasicInfo from "./task-basic-info.js";
import ActionThumbnail from "../actions/action-thumbnail.js";
import NodeInfo from "./node-info.js";
import CollapseComponent from "../collapse-component.js";


export default ({tasks, id}) => {
	const task = tasks.find((t) => t.id === id);
	const components = [
		{
			title: "View Basic Information",
			component: BasicInfo
		},
		{
			title: "View Actions Information",
			component: ActionThumbnail,
		},
		{
			title: "View Nodes To Kill Information",
			component: NodeInfo
		}
	];
	return <CollapseComponent data={task} components={components} />
}