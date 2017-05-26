import React from 'react';
import {LIST_STUDENTS,
    GET_STUDENT,
    ADD_STUDENT,
    DELETE_STUDENT,
    EDIT_STUDENT,
    GET_STUDENTS_FOR_CAMPUS
} from '../constants';

import axios from 'axios';

export const list_students = students => ({
    type: LIST_STUDENTS,
    students
});

export const get_student = student => ({
    type: GET_STUDENT,
    student
});

export const delete_student = student => ({
    type: DELETE_STUDENT,
    student
});

export const edit_student = student => ({
    type: EDIT_STUDENT,
    student
});

export const add_student = student => ({
    type: ADD_STUDENT,
    student
});

export const get_students_for_campus = campus_students => {
    return{
        type: GET_STUDENTS_FOR_CAMPUS,
        campus_students: campus_students
    }
};


// ========== dispatch actions ============ //

export const getAllStudents = () => {
    return dispatch => {
        axios.get(`/api/students`)
            .then(response => {
                dispatch(list_students(response.data));
            });
    };
};

export const getStudentById = studentId => {
    return dispatch => {
        axios.get(`/api/students/${studentId}`)
            .then(response => {
                dispatch(get_student(response.data));
            });
    };
};

export const getStudentForCampus = campusId => {
    return dispatch => {
        axios.get(`/api/campuses/${campusId}/students`)
            .then(response => response.data)
            .then(students => {
                dispatch(get_students_for_campus(students))
            })
            .catch(console.error);
    };
};

export const addStudent = studentInfo => {
    return dispatch => {
        const name = studentInfo.name;
        const email = studentInfo.email;

        axios.post(`/api/students`)
    }
}