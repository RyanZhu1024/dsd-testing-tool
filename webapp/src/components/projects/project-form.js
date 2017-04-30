import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

const renderField = ({ input, label, type, meta: { touched, error} }) => {
    return <div className={`form-group ${touched && (error ? "has-danger" : "has-success")}`}>
        <label htmlFor={input.name}><h5>{label}</h5></label>
        <div>
            <input className="form-control" {...input} type={type}/>
            {touched && <div className="form-control-feedback">{error ? error : "Excellent"}</div>}
        </div>
    </div>
};

class ProjectForm extends Component{

    render () {
        const {submitting, pristine, handleSubmit} = this.props;
        return <form onSubmit={handleSubmit}>
                <Field validate={(value) => value ? undefined : "Name Can't be empty"} className="form-control" name="name"
                   label="Task Name" component={renderField} type="text" />
                <Switch>
                    <Route path="/projects/new" exact={true} render={() => <button type="submit" disabled={submitting || pristine} className="btn btn-primary">Create</button>}/>
                    <Route path="/projects/:id" render={({match}) => <ButtonGroup id={match.params.id} {...this.props}/>}/>
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

ProjectForm = reduxForm({
    form: 'project',
    enableReinitialize: true,
})(ProjectForm);

export default ProjectForm;