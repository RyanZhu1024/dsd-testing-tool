/**
 * Created by shuxuan on 12/03/2017.
 */
import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import "./style.css";

const subMenu = (projects, title, path) => {
	return <div className="dropdown-item dropdown-submenu">
		<a tabIndex="-1" href="#">
			{title}
		</a>
		<ul className="dropdown-menu">
			{
				projects.map((project) => {
					return <li key={project.id}>
						<Link to={`/${path}?projectId=${project.id}`} className="dropdown-item interaction" data-module="git" data-action="status">
							{project.name}
						</Link>
					</li>
				})
            }
		</ul>
	</div>
};

class InProject extends Component{
	render() {
		console.log(this.props.projects);
        return <ul className="navbar-nav mr-auto">
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="actionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Projects
				</a>
				<div className="dropdown-menu" aria-labelledby="actionDropdown">
					<Link className="dropdown-item" to="/projects">View Projects</Link>
					<Link className="dropdown-item" to="/projects/new">New Project</Link>
				</div>
			</li>
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="taskDropdown" data-toggle="dropdown"
				   aria-haspopup="true" aria-expanded="false">
					Tasks
				</a>
				<div className="dropdown-menu" aria-labelledby="taskDropdown">
					{/*<Link className="dropdown-item" to="/tasks">View Tasks By Project</Link>*/}
					{subMenu(this.props.projects, "View Tasks By Project", "tasks")}
					<Link className="dropdown-item" to="/tasks/new">New Task</Link>
				</div>
			</li>
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="actionDropdown" data-toggle="dropdown"
				   aria-haspopup="true" aria-expanded="false">
					Actions
				</a>
				<div className="dropdown-menu" aria-labelledby="actionDropdown">
					<Link className="dropdown-item" to="/actions">View Actions</Link>
                    {/*{subMenu(this.props.projects, "View Actions By Project", "actions")}*/}
					<Link className="dropdown-item" to="/actions/new">New Action</Link>
				</div>
			</li>
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="actionDropdown" data-toggle="dropdown"
				   aria-haspopup="true" aria-expanded="false">
					Nodes
				</a>
				<div className="dropdown-menu" aria-labelledby="actionDropdown">
					{/*<Link className="dropdown-item" to="/nodes">View Nodes By Project</Link>*/}
                    {subMenu(this.props.projects, "View Nodes By Project", "nodes")}
				</div>
			</li>
		</ul>
    }
};

const outOfProject = () => {
	return <ul className="navbar-nav mr-auto">
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" href="#" id="actionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Projects
			</a>
			<div className="dropdown-menu" aria-labelledby="actionDropdown">
				<Link className="dropdown-item" to="/projects">View Projects</Link>
				<Link className="dropdown-item" to="/projects/new">New Project</Link>
			</div>
		</li>
	</ul>
};

export default (props) => {
  return (
	  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
		  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
		          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
		          aria-label="Toggle navigation">
			  <span className="navbar-toggler-icon"></span>
		  </button>
		  <Link className="navbar-brand" to="/projects">Distributed Testing Tool</Link>

		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			  <Route path="/" render={() => <InProject {...props}/>}/>
			  <form className="form-inline my-2 my-lg-0">
				  <input className="form-control mr-sm-2" type="text" placeholder="Search Task" />
				  <button disabled="disabled" className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			  </form>
		  </div>
	  </nav>
  )
};
