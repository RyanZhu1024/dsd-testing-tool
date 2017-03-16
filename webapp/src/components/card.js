/**
 * Created by shuxuan on 16/03/2017.
 */
import React from "react";
import {Route, Link} from "react-router-dom";

export default ({id, title, viewPath, updatePath, disable, summary}) => {
	return <div key={id} className={`card`}>
		<div className="card-block">
			<Link to={viewPath}><h4 className="card-title">{title}</h4></Link>
			<h6 className="card-subtitle mb-2 text-muted">{disable ? "Disabled" : "Enabled"}</h6>
			<p className="card-text">
				{JSON.stringify(summary).substring(0, 50)}
				{/*{JSON.stringify(Object.assign({}, {Delay: action.delay, Repeat: action.repeat, Request: action.request, Response: action.response}))}*/}
			</p>
			<Route path="/tasks/:id" exact={true} component={() => <a href="#" className="card-link">{disable ? "Enable" : "Disable"}</a>}/>
			<Route path="/actions" exact={true} component={() => <a href="#" className="card-link">Delete Action</a>}/>
			<Link className="card-link" to={updatePath}>Update</Link>
		</div>
	</div>
}