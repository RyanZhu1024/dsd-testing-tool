/**
 * Created by shuxuan on 15/03/2017.
 */
import React from "react";

export default ({actions}) => {
	return <div>
		{actions.map((action) => {
			return <div key={action.id} className="card">
				<div className="card-block">
					<h4 className="card-title">{action.name}</h4>
					<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
					<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<a href="#" className="card-link">Disable Action</a>
					<a href="#" className="card-link">Update Action</a>
				</div>
			</div>
		})}
	</div>
}