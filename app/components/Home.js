import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Campus from '../components/Campus';
import Campuses from '../components/Campuses';


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
                                />)

                            :(<Campus
                                    campus={props.campus}
                                    students={props.students}
                                    onDeleteStudent={props.onDeleteStudent}
                                />)
            }

            <Sidebar
                onAddStudentSubmit={props.onAddStudentSubmit}
                onAddCampusSubmit={props.onAddCampusSubmit}
                campuses={props.campuses}
                campus={props.campus}
                addOption={props.addOption}
            />
        </div>

    )
}

export default Home;