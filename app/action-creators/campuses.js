import React from 'react';
import {LIST_CAMPUSES,
    GET_CAMPUS,
    ADD_CAMPUS,
    DELETE_CAMPUS,
    EDIT_CAMPUS
} from '../constants';

import axios from 'axios';

export const list_campuses = campuses => ({
    type: LIST_CAMPUSES,
    campuses
});

export const get_campus = campus => ({
    type: GET_CAMPUS,
    campus
});

export const delete_campus = campus => ({
    type: DELETE_CAMPUS,
    campus
});

export const edit_campus = campus => ({
    type: EDIT_STUDENT,
    campus
});

export const add_campus = campus => ({
    type: ADD_CAMPUS,
    campus
});


// ========== dispatch actions ============ //

export const getAllCampuses = () => {
    return dispatch => {
        axios.get(`/api/campuses`)
            .then(response => {
                dispatch(list_campuses(response.data));
            });
    };
};

