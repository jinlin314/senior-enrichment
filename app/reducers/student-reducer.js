import React from 'react';
import {LIST_STUDENTS,
    GET_STUDENT,
    ADD_STUDENT,
    DELETE_STUDENT,
    EDIT_STUDENT,
    GET_STUDENTS_FOR_CAMPUS
} from '../constants';

const initialState = { student: null, students: null };

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LIST_STUDENTS:
            return action.students;
        case GET_STUDENT:
            return action.student;
        case ADD_STUDENT:
            return action.student;
        case EDIT_STUDENT:
            return action.student;
        case DELETE_STUDENT:
            return action.student;
        case GET_STUDENTS_FOR_CAMPUS:
            return action.campus_students;
        default:
            return state;
    }
}

export default reducer;