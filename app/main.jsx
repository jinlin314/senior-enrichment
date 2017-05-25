'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, hashHistory, IndexRedirect, IndexRoute} from 'react-router';

import store from './store';
import Home from './containers/Home';

import axios from 'axios';

ReactDOM.render (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Home}>
            </Route>
        </Router>
    </Provider>,
  document.getElementById('main')
);