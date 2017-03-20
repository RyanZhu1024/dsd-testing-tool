/**
 * Created by shuxuan on 19/03/2017.
 */
import React, {Component} from "react";
import {Field, reduxForm, Fields} from "redux-form";
import {Route, Switch} from "react-router-dom";

const renderSelect = ({input, label, options, meta: {touched, error}}) => {
	return <div className={`form-group ${touched && (error ? "has-danger" : "has-success")}`}>
		<label htmlFor={input.name}><h5>{label}</h5></label>
		<div>
			<select className="form-control" {...input}>
				<option value=""></option>
				{
					options.map((op) => <option key={op.key} value={op.key}>{op.value}</option>)
				}
			</select>
			{touched && <div className="form-control-feedback">{error ? error : "Excellent"}</div>}
		</div>
	</div>
};

const renderMultiSelect = ({input, label, options, meta: {touched, error}}) => {
	return <div className={`form-group ${touched && (error ? "has-danger" : "has-success")}`}>
		<label htmlFor={input.name}><h5>{label}</h5></label>
		<div>
			<select className="form-control" {...input} multiple="multiple">
				{
					options.map((op) => <option key={op.key} value={op.key}>{op.value}</option>)
				}
			</select>
			{touched && <div className="form-control-feedback">{error ? error : "Excellent"}</div>}
		</div>
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

const formComponent = (props) => {
	// const {actionOptions} = props;
	return <div>
		<Field validate={(value) => value ? undefined : "Name Can't be empty"} className="form-control" name="name" label="Task Name" component={renderField} type="text" />
		<Field validate={(value) => value ? undefined : "Way Can't be empty"} className="form-control" component={renderSelect} name="way" label="Way To Run"
		       multiple={false} options={[{key: 1, value: "Concurrently"}, {key: 2, value: "Sequentially"}]} />
		<Field validate={(value) => value ? undefined : "Way Can't be empty"} className="form-control" component={renderMultiSelect} name="actions" label="Way To Run"
		       options={props.actionOptions ? props.actionOptions.map(act => {return {key: act.id, value: act.name}}) : []} />
	</div>
};

class TaskForm extends Component {

	componentWillMount() {
		this.props.loadActionOptions();
	}

	render () {
		const {submitting, pristine, handleSubmit, actionOptions} = this.props;
		return <form onSubmit={handleSubmit}>
			<Fields names={[
				'name', 'way', 'actions', 'killProcess', 'verifyActions'
			]} actionOptions={actionOptions} component={formComponent}/>
			<Switch>
				<Route path="/tasks/new" exact={true} render={() => <button type="submit" disabled={submitting || pristine} className="btn btn-primary">Create</button>}/>
				<Route path="/tasks/:id/edit" render={({match}) => <ButtonGroup id={match.params.id} {...this.props}/>}/>
			</Switch>
		</form>
	}
}

class ButtonGroup extends Component {
	render() {
		const {submitting, pristine, handleDelete, id, history} = this.props;
		return <div className="btn-group" role="group">
			<button disabled={submitting || pristine} className="btn btn-primary" type="submit">Update</button>
			<button onClick={() => handleDelete(id, history)} className="btn btn-danger" type="button">Delete</button>
		</div>
	}
}

TaskForm = reduxForm({
	form: 'task',
	enableReinitialize: true,
})(TaskForm);

export default TaskForm;

