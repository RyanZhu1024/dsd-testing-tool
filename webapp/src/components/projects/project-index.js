/**
 * Created by shuxuan on 29/04/2017.
 */
import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import ProjectList from "./project-list";
import ProjectForm from "./project-form";

export default class ProjectIndex extends Component{
    render() {
        let props = this.props;
        return <Switch>
            <Route exact={true} path="/projects" render={() => <ProjectList {...props}/>}/>
            <Route exact={true} path="/projects/new" render={({history}) => {
                return <ProjectForm
                    onSubmit={(form) => props.createProject(form, history)} {...props} />
            }
            }/>
            <Route exact={true} path="/projects/:id" render={({match, history}) => {
                console.log(props.projects.find((t) => t.id === match.params.id));
                return <ProjectForm
                    history={history}
                    onSubmit={props.changeProject}
                    initialValues={props.projects.find((t) => t.id === match.params.id)}
                    {...props} />
            }
            }/>
        </Switch>;
    }
};