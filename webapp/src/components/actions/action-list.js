/**
 * Created by shuxuan on 16/03/2017.
 */
import React, {Component} from "react";
import ActionListItem from "./action-list-item";
export default class ActionList extends Component {
	componentWillMount () {
		this.props.loadActions();
	}

	render () {
		return <div className="list-group">
			{this.props.actions.map((action) => {
				return <ActionListItem key={action.id} action={action} {...this.props} />
			})}
		</div>
	}
}

