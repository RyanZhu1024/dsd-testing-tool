/**
 * Created by shuxuan on 15/03/2017.
 */
import React from "react";

export default ({name, actions, way, createdAt, modifiedAt}) => {
	return <table className="table">
		<tbody>
			<tr>
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr>
				<td>Case Actions Count</td>
				<td>{actions.length}</td>
			</tr>
			<tr>
				<td>Way To Run Actions</td>
				<td>{way === 1 ? "Concurrent" : "Sequential"}</td>
			</tr>
			<tr>
				<td>Created At</td>
				<td>{createdAt}</td>
			</tr>
			<tr>
				<td>Modified At</td>
				<td>{modifiedAt ? modifiedAt : createdAt}</td>
			</tr>
		</tbody>
	</table>
}