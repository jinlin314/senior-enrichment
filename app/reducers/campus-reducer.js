import React from 'react';
import {LIST_CAMPUSES,
    GET_CAMPUS,
    ADD_CAMPUS,
    DELETE_CAMPUS,
    EDIT_CAMPUS,
    GO_HOME
} from '../constants';

const initialState = { campus: null, campuses: null, campus_students: null };

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LIST_CAMPUSES:
            return action.campuses;
        case GET_CAMPUS:
            return action.campus;
        case ADD_CAMPUS:
            return action.campus;
        case EDIT_CAMPUS:
            return action.campus;
        case DELETE_CAMPUS:
            return action.campus;
        case GO_HOME:
            return action.campus;
        default:
            return state;
    }
}

export default reducer;