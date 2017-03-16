import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./header.js";
import Welcome from "./welcome.js";
import TaskContainer from "../containers/task-container.js";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route exact={true} path="/" component={Welcome} />
          <Route path="/tasks" component={TaskContainer} />
        </div>
      </Router>
    )
  }
}
