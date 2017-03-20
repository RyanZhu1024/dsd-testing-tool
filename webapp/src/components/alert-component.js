/**
 * Created by shuxuan on 20/03/2017.
 */
import React, {Component} from "react";

export default class AlertComponent extends Component {
	componentWillMount() {
		console.log(`mounting alert component and will be closed in 3 seconds ${this.props.closeAlert}`);
		setTimeout(this.props.closeAlert, 5000);
	}

	render () {
		const {level, message} = this.props;
		return <div className={`alert alert-${level} alert-dismissible fade show`} role="alert">
			<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			<strong>Great!</strong> {message}
		</div>
	}
}