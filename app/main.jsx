'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, hashHistory, IndexRedirect, IndexRoute, Redirect} from 'react-router';

import store from './store';
import HomeContainer from './containers/HomeContainer';

import campuses from './components/campuses';
import campus from './components/campus';

import axios from 'axios';

import {getAllStudents} from './action-creators/students';
import {getAllCampuses} from './action-creators/campuses';


ReactDOM.render (
    <Provider store={store}>
        <HomeContainer />
    </Provider>,
  document.getElementById('main')
);