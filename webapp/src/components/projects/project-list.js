/**
 * Created by shuxuan on 29/04/2017.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class ProjectList extends Component {

    render() {
        return <div className="list-group">
            {this.props.projects.map((project) => {
                return <Link key={project.id} to={`/projects/${project.id}`} className="list-group-item">{project.name}</Link>
            })}
        </div>
    }

}