/**
 * Created by shuxuan on 20/03/2017.
 */
import React, {Component} from "react";

export default class AlertComponent extends Component {

	componentWillReceiveProps(nextProps) {
		const {alert, closeAlert} = nextProps;
		if (alert.show) {
			console.log(`alert component ${alert.show}, set timeout for 3 seconds`);
			setTimeout(closeAlert, 3000);
		}
	}

	render () {
		const {alert} = this.props;
		return alert.show ? <div className={`alert alert-${alert.level}`} role="alert">
			<strong>Great!</strong> {alert.message}
		</div> : null;
	}
}