import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import EditStudent from '../components/EditStudent';
import EditCampus from '../components/EditCampus';

const EditForm = (props) => {
    console.log("EditForm props: ", props);

    return (
        <div id="main" className="container-fluid">
            <Navbar campus={props.campus}
                    onHomeClick={props.onHomeClick} />

            {
                (props.editMode === 'editStudent')?
                    (
                        <EditStudent
                            student={props.student}
                            campus={props.campus}
                            campuses={props.campuses}
                            onEditStudentSubmit={props.onEditStudentSubmit}
                            onSelectOption={props.onSelectOption}
                        />
                    ):
                    (
                        <EditCampus
                            campus={props.campus}
                            onEditCampusSubmit={props.onEditCampusSubmit}
                        />
                    )

            }
        </div>

    );
}
export default EditForm;