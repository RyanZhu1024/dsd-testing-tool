import React, {Component} from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "./reducers";
import AppContainer from "./containers/app-container";
import Axios from "axios";

const store = createStore(reducers);

export default class Root extends Component {

  getChildContext() {
    return {
      axios: Axios.create({
	      baseURL: '/api/v1/',
	      timeout: 1000
      })
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

Root.childContextTypes = {
  axios: React.PropTypes.func
};
