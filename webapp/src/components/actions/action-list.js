/**
 * Created by shuxuan on 16/03/2017.
 */
import React, {Component} from "react";
import ActionListItem from "./action-list-item";
import {NavLink} from "react-router-dom";
export default class ActionList extends Component {
	componentWillMount () {
		this.props.loadActions();
	}

	render () {
		return <div className="list-group">
			<NavLink to="/actions/new" activeClassName="active" className="list-group-item list-group-item-action">New Action</NavLink>
			{this.props.actions.map((action) => {
				return <ActionListItem key={action.id} action={action} {...this.props} />
			})}
		</div>
	}
}

