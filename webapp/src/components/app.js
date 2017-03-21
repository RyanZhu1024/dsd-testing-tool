import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./header.js";
import Welcome from "./welcome.js";
import TaskContainer from "../containers/task-container.js";
import ActionContainer from "../containers/actions-container";

export default (props) => {
  return (
    <Router forceRefresh={false}>
      <div className="container">
        <Header />
        {/*<Route exact={true} path="/" component={Welcome} />*/}
        {/*<Route path="/tasks" component={TaskContainer} />*/}
        {/*<Route path="/actions" component={ActionContainer} />*/}
        //we have to extract location props from route when render a container component in react router
        <Route exact={true} path="/" render={() => <Welcome {...props}/> }  />
        <Route path="/tasks" render={({location}) => <TaskContainer location={location} {...props}/>}     />
        <Route path="/actions" render={(location) => <ActionContainer location={location} {...props}/>} />
      </div>
    </Router>
  )
}
