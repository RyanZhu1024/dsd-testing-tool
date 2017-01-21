import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes.js';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
      </Provider>
    )
  }
}
