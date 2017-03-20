/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import {Link} from "react-router-dom";


export default () => {
  return (
	  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
		  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
		          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
		          aria-label="Toggle navigation">
			  <span className="navbar-toggler-icon"></span>
		  </button>
		  <Link className="navbar-brand" to="/">Distributed Testing Tool</Link>

		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			  <ul className="navbar-nav mr-auto">
				  <li className="nav-item dropdown">
					  <a className="nav-link dropdown-toggle" href="#" id="taskDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						  Tasks
					  </a>
					  <div className="dropdown-menu" aria-labelledby="taskDropdown">
						  <Link className="dropdown-item" to="/tasks">View Tasks</Link>
						  <Link className="dropdown-item" to="/tasks/new">New Task</Link>
					  </div>
				  </li>
				  <li className="nav-item dropdown">
					  <a className="nav-link dropdown-toggle" href="#" id="actionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						  Actions
					  </a>
					  <div className="dropdown-menu" aria-labelledby="actionDropdown">
						  <Link className="dropdown-item" to="/actions">View Actions</Link>
						  <Link className="dropdown-item" to="/actions/new">New Action</Link>
					  </div>
				  </li>
			  </ul>
			  <form className="form-inline my-2 my-lg-0">
				  <input className="form-control mr-sm-2" type="text" placeholder="Search Task" />
				  <button disabled="disabled" className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			  </form>
		  </div>
	  </nav>
  )
};
