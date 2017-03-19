/**
 * Created by shuxuan on 15/03/2017.
 */
import React from "react";

export default ({task}) => {
	return task ? (<table className="table">
		<tbody>
			<tr>
				<td>Name</td>
				<td>{task.name}</td>
			</tr>
			<tr>
				<td>Case Actions Count</td>
				<td>{task.actions ? task.actions.length : 0}</td>
			</tr>
			<tr>
				<td>Way To Run Actions</td>
				<td>{task.way === 1 ? "Concurrent" : "Sequential"}</td>
			</tr>
			<tr>
				<td>Created At</td>
				<td>{task.createdAt}</td>
			</tr>
			<tr>
				<td>Modified At</td>
				<td>{task.modifiedAt ? task.modifiedAt : task.createdAt}</td>
			</tr>
		</tbody>
	</table>) : null;
}