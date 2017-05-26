
import React, {Component} from 'react';
import Home from '../components/Home';
import Sidebar from '../components/Sidebar';
import {connect} from 'react-redux';
import {getAllStudents} from '../action-creators/students';
import {getAllCampuses} from '../action-creators/campuses';
import {getStudentForCampus} from '../action-creators/students';
import store from '../store';
import axios from 'axios';


export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            students: [],
            instructor: null,
            instructors: [],
            campus: null,
            campuses: [],
            addOption: 'campus',
            rerenderToggle: 0

        };

        this.onCampusesClick = this.onCampusesClick.bind(this);
        this.onHomeClick = this.onHomeClick.bind(this);
        this.onAddStudentSubmit = this.onAddStudentSubmit.bind(this);
        this.onAddCampusSubmit = this.onAddCampusSubmit.bind(this);
        this.onDeleteStudent = this.onDeleteStudent.bind(this);
        this.onDeleteCampus = this.onDeleteCampus.bind(this);
    }

    componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        store.dispatch(getAllCampuses());
        store.dispatch(getAllStudents());
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    onCampusesClick(campus){
        this.setState({campus: campus});
        this.setState({addOption: 'student'});
        store.dispatch(getStudentForCampus(campus.id));

    }

    onHomeClick(){
        this.setState({campus: null});
        this.setState({addOption: 'campus'});
        console.log("Home button clicked");
    }

    onAddStudentSubmit(event){
        event.preventDefault();
        const studentName = event.target.name.value;
        const studentEmail = event.target.email.value;
        const campusId = parseInt(event.target.campusId.value);
        //const img = event.target.img.value;

        const studentInfo = {name: studentName,
                             email: studentEmail,
                             campusId: campusId};

        axios.post('/api/students', studentInfo)
            .then(res => res.data)
            .then(student => {
                console.log("student created: ", student);
            })
            .catch(console.error);

        this.setState({rerenderToggle: Math.random()});
    }

    // =========add a campus===========
    onAddCampusSubmit (event){
        event.preventDefault();

        const campusName = event.target.name.value;
        // const imgUrl = event.target.email.value;
        const imgUrl = "img/logo.jpg";

        console.log(">>>>add campus button clicked + ", campusName, imgUrl);

        const campusInfo = {name: campusName,
                            imgUrl: imgUrl};

        axios.post('/api/campuses', campusInfo)
            .then(res => res.data)
            .then(campus => {
                console.log("campus created: ", campus);
            })
            .catch(console.error);

        this.setState({rerenderToggle: Math.random()});
    }

    //=====delete a student =====//
    onDeleteStudent (student){
        var studentId = student.id
        axios.delete(`api/students/${studentId}`)
            .then(res => res.data)
            .catch(console.error);
        this.setState({rerenderToggle: Math.random()});
    }

    //=====delete a campus =====//
    onDeleteCampus (campus){
        var campustId = campus.id
        axios.delete(`api/campuses/${campustId}`)
            .then(res => res.data)
            .catch(console.error);

        this.setState({rerenderToggle: Math.random()});
    }




    render(){
        return (
            <div>
                <Home student={this.state.student}
                      campus={this.state.campus}
                      students={this.state.students}
                      campuses={this.state.campuses}
                      addOption={this.state.addOption}
                      onCampusesClick={this.onCampusesClick}
                      onHomeClick={this.onHomeClick}
                      onAddStudentSubmit={this.onAddStudentSubmit}
                      onAddCampusSubmit={this.onAddCampusSubmit}
                      onDeleteStudent={this.onDeleteStudent}
                      onDeleteCampus={this.onDeleteCampus}
                />

            </div>
        )
    }

}
