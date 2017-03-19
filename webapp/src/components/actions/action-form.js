/**
 * Created by shuxuan on 17/03/2017.
 */
import React, {Component} from "react";
import {Field, reduxForm, Fields, FieldArray} from "redux-form";

const requestComponent = (fields) => {
	return <div>
		<div className="form-group">
			<label htmlFor="request.method"><h5>Method</h5></label>
			<Field className="form-control" name="request.method" component="select">
				<option value=""></option>
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
				<option value="DELETE">DELETE</option>
			</Field>
		</div>
		<Field validate={(value) => value ? undefined : "Url Can't be empty"} label="URL"
			className="form-control" name="request.url" type="text" component={renderField}/>
		<div className="form-group">
			<label htmlFor="request.headers"><h5>Headers</h5></label>
			<FieldArray name="request.headers" component={headersComponent} />
		</div>
		<Field name="request.data" type="text" component={renderField} label="Body"/>
	</div>
};

const responseExpectedComponent = (fields) => {
	return <div>
		<Field validate={(value) => value ? undefined : "Response Code Can't be empty"} label="Code"
       className="form-control" name="responseExpected.code" type="number" component={renderField}/>
		<Field name="responseExpected.data" type="text" component={renderField} label="Body"/>
	</div>
};

const renderField = ({ input, label, type, meta: { touched, error} }) => {
	return <div className={`form-group ${touched && (error ? "has-danger" : "has-success")}`}>
		<label htmlFor={input.name}><h5>{label}</h5></label>
		<div>
			<input className="form-control" {...input} type={type}/>
			{touched && <div className="form-control-feedback">{error ? error : "Excellent"}</div>}
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
	// console.log(JSON.stringify(fields));
	return <div>
		<Field className="form-control" {...fields.name.input} label="Action Name" component={renderField} type="text" />
		<Field className="form-control" {...fields.delay.input} label="Delay Time" component={renderField} type="number" />
		<Field className="form-control" {...fields.repeat.input} label="Repeat" component={renderField} type="number" />
		<div className="form-group">
			<label htmlFor="request"><h3>Request</h3></label>
			<Fields names={['request.method','request.url', 'request.headers, request.data']} className="form-control" component={requestComponent} />
		</div>
		<div className="form-group">
			<label htmlFor="request"><h3>Response Expected</h3></label>
			<Fields names={['responseExpected.code, responseExpected.data']} className="form-control" component={responseExpectedComponent} />
		</div>
	</div>
};

class ActionForm extends Component {

	render () {
		const {submitting, pristine, handleSubmit} = this.props;
		return <form onSubmit={handleSubmit}>
				<Fields names={[
					'name', 'delay', 'repeat', 'request',
					'responseExpected',
				]} component={formComponent}/>
				<button type="submit" disabled={submitting || pristine} className="btn btn-primary">Submit</button>
			</form>
	}
}

ActionForm = reduxForm({
	form: 'action',
	enableReinitialize: true,
})(ActionForm);

export default ActionForm;