/**
 * Created by shuxuan on 15/03/2017.
 */
import React from "react";
import {Link} from 'react-router-dom';

export default () => {
	return (<div className="jumbotron">
		<h1 className="display-3">Distributed Testing Tool</h1>
		<p className="lead">Star building your distributed system test cases</p>
		<hr className="my-4" />
			<p>Support http based api testing</p>
			<p className="lead">
				<Link className="btn btn-primary btn-lg" to={`actions/new`} role="button">Learn more</Link>
			</p>
	</div>);
}