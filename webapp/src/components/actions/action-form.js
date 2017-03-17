/**
 * Created by shuxuan on 17/03/2017.
 */
import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";

const requestComponent = () => {
	return <div className="row">
		<div className="col-lg-1"></div>
		<div className="col-lg-11">
			<div className="form-group">
				<label htmlFor="request.method"><h5>Request Method</h5></label>
				<Field className="form-control" name="request.method" component="select">
					<option value=""></option>
					<option value="GET">GET</option>
					<option value="POST">POST</option>
					<option value="PUT">PUT</option>
					<option value="DELETE">DELETE</option>
				</Field>
			</div>
			<div className="form-group">
				<label htmlFor="request.url"><h5>Request URL</h5></label>
				<Field className="form-control" name="request.url" component="input" type="text" />
			</div>
			<div className="form-group">
				<label htmlFor="request.headers"><h5>Request Headers</h5></label>
				<Field className="form-control" name="request.headers" component="input" type="text" />
			</div>
			<div className="form-group">
				<label htmlFor="request.data"><h5>Request Body</h5></label>
				<Field className="form-control" name="request.data" component="input" type="textarea" />
			</div>
		</div>
	</div>
};

class ActionForm extends Component {

	render () {
		const {handleSubmit} = this.props;
		return <form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="name"><h3>Action Name</h3></label>
				<Field className="form-control" name="name" component="input" type="text" />
			</div>
			<div className="form-group">
				<label htmlFor="delay"><h3>Delay Time</h3></label>
				<Field className="form-control" name="delay" component="input" type="number" />
			</div>
			<div className="form-group">
				<label htmlFor="repeat"><h3>Repeat</h3></label>
				<Field className="form-control" name="repeat" component="input" type="number" />
			</div>
			<div className="form-group">
				<label htmlFor="request"><h3>Request</h3></label>
				<Field className="form-control" name="request" component={requestComponent} />
			</div>
		</form>
	}
}

ActionForm = reduxForm({
	form: 'action',
	enableReinitialize: true
})(ActionForm);

export default ActionForm;