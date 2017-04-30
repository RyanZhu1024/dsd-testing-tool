import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Welcome from "./welcome.js";
import TaskContainer from "../containers/task-container.js";
import ActionContainer from "../containers/actions-container";
import NodeContainer from "../containers/node-container";
import ProjectContainer from "../containers/project-container";
import HeaderContainer from "../containers/header-container";

export default (props) => {
  return (
    <Router forceRefresh={false}>
      <div className="container">
        {/*<Header />*/}
        <Route path="/" render={({location}) => <HeaderContainer location={location} {...props}/>} />
        {/*<Route exact={true} path="/" component={Welcome} />*/}
        {/*<Route path="/tasks" component={TaskContainer} />*/}
        {/*<Route path="/actions" component={ActionContainer} />*/}
        {/*we have to extract location props from route when render a container component in react router*/}
        <Route exact={true} path="/" render={() => <Welcome {...props}/> }  />
        <Route path="/tasks" render={({location}) => <TaskContainer location={location} {...props}/>}     />
        <Route path="/actions" render={({location}) => <ActionContainer location={location} {...props}/>} />
        <Route path="/nodes" render={({location}) => <NodeContainer location={location} {...props}/>} />
        <Route path="/projects" render = {({location}) => <ProjectContainer location={location} {...props}/>} />
      </div>
    </Router>
  )
}
