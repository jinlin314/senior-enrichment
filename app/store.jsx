import {createStore, combineReducers} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import studentReducer from './reducers/student-reducer';
import campusReducer from './reducers/campus-reducer'
import instructorReducer from './reducers/instructor-reducer'


const applyMiddleware = require('redux').applyMiddleware;

const reducer = combineReducers({
    students: studentReducer,
    campuses: campusReducer

    // instructors: instructorReducer
});

export default createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware));
