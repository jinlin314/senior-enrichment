import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Campus from '../components/Campus';
import Campuses from '../components/Campuses';
import EditForm from '../components/EditForm';


const Home = (props) => {
    console.log(">>Home props: ", props);
    return (
        <div id="main" className="container-fluid">
            <Navbar campus={props.campus}
                    onHomeClick={props.onHomeClick} />

            {
                (!props.campus) ? (<Campuses
                    campuses={props.campuses}
                    onCampusesClick={props.onCampusesClick}
                    onDeleteCampus={props.onDeleteCampus}
                    onEditCampus={props.onEditcampus}
                    editMode={props.editMode}
                />)

                    :(<Campus
                    campus={props.campus}
                    students={props.students}
                    onDeleteStudent={props.onDeleteStudent}
                    onEditStudent={props.onEditStudent}
                    editMode={props.editMode}
                />)
            }

            (<Sidebar
                onAddStudentSubmit={props.onAddStudentSubmit}
                onAddCampusSubmit={props.onAddCampusSubmit}
                onEditStudentSubmit={props.onEditStudentSubmit}
                onEditCampusSubmit={props.onEditCampusSubmit}
                campuses={props.campuses}
                campus={props.campus}
                formOption={props.formOption}
            />)


        </div>

    )
}

export default Home;