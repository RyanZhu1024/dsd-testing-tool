/**
 * Created by shuxuan on 17/03/2017.
 */
import React, {Component} from "react";
import {Field, reduxForm, Fields} from "redux-form";

const requestComponent = (fields) => {
	return <div className="row">
		<div className="col-lg-1"></div>
		<div className="col-lg-11">
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
				<label htmlFor="url"><h3>URL</h3></label>
				<Field className="form-control" {...fields.request.url.input} type="text" component="input"/>
			</div>
			{/*{*/}
				{/*Object.keys(fields.request.headers.input.value).map((key,index) => {*/}
					{/*const header = {*/}
						{/*name: `request.headers.${key}`,*/}
						{/*value: fields.request.headers.input.value.key*/}
					{/*};*/}
					{/*return <div key={`header${index}`} className="form-inline">*/}
						{/*Key: <Field className="form-control" name={header.key} value={header.key} component="input" type="text" />*/}
						{/*Value: <Field className="form-control" name={header.value} value={header.value} component="input" type="text" />*/}
					{/*</div>*/}
				{/*})*/}
			{/*}*/}
		</div>
	</div>
};


const formComponent = (fields) => {
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