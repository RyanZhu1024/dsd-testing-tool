/**
 * Created by shuxuan on 17/03/2017.
 */
import React, {Component} from "react";
import {Field, reduxForm, Fields, FieldArray} from "redux-form";

const requestComponent = (fields) => {
	return <div>
		<div className="form-group">
			<label htmlFor="request.method"><h5>Method</h5></label>
			<Field className="form-control" {...fields.request.method.input} component="select">
				<option value=""></option>
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
				<option value="DELETE">DELETE</option>
			</Field>
		</div>
		<div className="form-group">
			<label htmlFor="url"><h5>URL</h5></label>
			<Field className="form-control" {...fields.request.url.input} type="text" component="input"/>
		</div>
		<div className="form-group">
			<label htmlFor="request.headers"><h5>Headers</h5></label>
			<FieldArray name="request.headers" component={headersComponent} />
		</div>
	</div>
};

const headersComponent = ({fields}) => {
	return <div>
		{fields.length > 0 ? fields.map((header, index) => {
			return <div className="form-inline" key={header}>
				<div className="input-group mb-2 mr-sm-2 mb-sm-0">
					<div className="input-group-addon">Key</div>
					<Field className="form-control" name={`${header}.key`} type="text" component="input" />
				</div>
				<div className="input-group mb-2 mr-sm-2 mb-sm-0">
					<div className="input-group-addon">Value</div>
					<Field className="form-control" name={`${header}.value`} type="text" component="input" />
				</div>
				<div className="btn-group" role="group">
					<button onClick={() => fields.push()} className="btn btn-primary" type="button">Add</button>
					<button onClick={() => fields.remove(index)} className="btn btn-danger" type="button">Delete</button>
				</div>
			</div>
		}) : <div className="btn-group" role="group">
				<button onClick={() => fields.push()} className="btn btn-primary" type="button">Add</button>
			</div>
		}
	</div>
};

const formComponent = (fields) => {
	console.log(`From request component: ${JSON.stringify(fields)}`);
	return <div>
		<div className="form-group">
			<label htmlFor="name"><h3>Action Name</h3></label>
			<Field className="form-control" {...fields.name.input} component="input" type="text" />
		</div>
		<div className="form-group">
			<label htmlFor="delay"><h3>Delay Time</h3></label>
			<Field className="form-control" {...fields.delay.input} component="input" type="number" />
		</div>
		<div className="form-group">
			<label htmlFor="repeat"><h3>Repeat</h3></label>
			<Field className="form-control" {...fields.repeat.input} component="input" type="number" />
		</div>
		<div className="form-group">
			<label htmlFor="request"><h3>Request</h3></label>
			<Fields names={['request.method','request.url', 'request.headers']} className="form-control" component={requestComponent} />
		</div>
	</div>
};

class ActionForm extends Component {

	render () {
		const {handleSubmit} = this.props;
		return <form onSubmit={handleSubmit}>
			<Fields names={[
				'name', 'delay', 'repeat', 'request',
				'responseExpected',
			]} component={formComponent}/>
		</form>
	}
}

ActionForm = reduxForm({
	form: 'action',
	enableReinitialize: true
})(ActionForm);

export default ActionForm;