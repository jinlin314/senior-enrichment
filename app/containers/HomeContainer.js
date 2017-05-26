
import React, {Component} from 'react';
import Home from '../components/Home';
import EditForm from '../components/EditForm';
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
            selectedCampus: null,
            formOption: 'addCampus',
            editMode: null,
            rerenderToggle: 0

        };

        this.onCampusesClick = this.onCampusesClick.bind(this);
        this.onHomeClick = this.onHomeClick.bind(this);
        this.onAddStudentSubmit = this.onAddStudentSubmit.bind(this);
        this.onAddCampusSubmit = this.onAddCampusSubmit.bind(this);
        this.onDeleteStudent = this.onDeleteStudent.bind(this);
        this.onDeleteCampus = this.onDeleteCampus.bind(this);
        this.onEditcampus = this.onEditcampus.bind(this);
        this.onEditStudent = this.onEditStudent.bind(this);
        this.onEditCampusSubmit = this.onEditCampusSubmit.bind(this);
        this.onEditStudentSubmit = this.onEditStudentSubmit.bind(this);
        this.onSelectOption = this.onSelectOption.bind(this);
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
        this.setState({formOption: 'addStudent'});
        store.dispatch(getStudentForCampus(campus.id));

    }

    onHomeClick(){
        this.setState({campus: null});
        this.setState({editMode: null});
        this.setState({formOption: 'addCampus'});
    }

    onAddStudentSubmit(event){
        event.preventDefault();
        const studentName = event.target.name.value;
        const studentEmail = event.target.email.value;
        const campusId = parseInt(event.target.campusId.value);

        if(!studentName || !studentEmail){
            alert('student Name and Email can not be empty');
            return;
        }

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

        if(!campusName){
            alert('campus Name can not be empty');
            return;
        }

        const campusInfo = {name: campusName,
                            imgUrl: imgUrl};

        axios.post('/api/campuses', campusInfo)
            .then(res => res.data)
            .then(campus => {
                console.log("campus created: ", campus);
            })
            .catch(console.error);

        forceUpdate();
        this.setState({rerenderToggle: Math.random()});

        alert("New Campus Added!");
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
        axios.delete(`api/students/all/${campustId}`)
            .then(()=>console.log('students deleted'))
            .catch(console.error);

        axios.delete(`api/campuses/${campustId}`)
            .catch(console.error);

        this.setState({rerenderToggle: Math.random()});
    }

    //======Edit campus========//
    onEditcampus (campus){
        console.log('this is edit campus click handler');
        this.setState({campus: campus});
        this.setState({editMode: 'editCampus'});
    }

    onEditCampusSubmit (event){

        event.preventDefault();

        var campusId = this.state.campus.id;
        var campusName = event.target.name.value;
        if(!event.target.imgUrl){
            var imgUrl = this.campus.imgUrl;
        }


        var campusInfo = {name: campusName,
            imgUrl: imgUrl};

        axios.put(`/api/campuses/${campusId}`, campusInfo)
            .then(res => res.data)
            .then(campus => {
                console.log("campus updated: ", campus);
            })
            .catch(console.error);

        this.setState({campus: null});
        this.setState({editMode: null});

        alert("Campus Info Updated!");
    }

    //======Edit student========//
    onEditStudent (student){
        console.log('this is edit student click handler');
        this.setState({student: student});
        this.setState({editMode: 'editStudent'});
    }

    onSelectOption (event){
        console.log(">>>>>",event.target);
        this.setState({selectedCampus: event.target.value});
        console.log('selected campus = ', this.state.selectedCampus);
    }

    onEditStudentSubmit (event){
        console.log("this is edit student submit handler");

        event.preventDefault();
        const studentName = event.target.name.value;
        const studentEmail = event.target.email.value;
        //const campusId = parseInt(event.target.campus.key);
        const campusId = this.state.selectedCampus;


        const studentInfo = {name: studentName,
            email: studentEmail,
            campusId: campusId};

        axios.put(`/api/students/${this.state.student.id}`, studentInfo)
            .then(res => res.data)
            .then(student => {
                console.log("student updated: ", student);
            })
            .catch(console.error);

        this.setState({student: null});
        this.setState({editMode: null});
    }




    render(){
        return (
            <div>

                {
                    (!this.state.editMode)?
                        <Home student={this.state.student}
                              campus={this.state.campus}
                              students={this.state.students}
                              campuses={this.state.campuses}
                              formOption={this.state.formOption}
                              editMode={this.state.editMode}
                              onCampusesClick={this.onCampusesClick}
                              onHomeClick={this.onHomeClick}
                              onAddStudentSubmit={this.onAddStudentSubmit}
                              onAddCampusSubmit={this.onAddCampusSubmit}
                              onDeleteStudent={this.onDeleteStudent}
                              onDeleteCampus={this.onDeleteCampus}
                              onEditcampus={this.onEditcampus}
                              onEditStudent={this.onEditStudent}
                        />
                        :(
                            <EditForm
                                editMode={this.state.editMode}
                                campus={this.state.campus}
                                campuses={this.state.campuses}
                                student={this.state.student}
                                onHomeClick={this.onHomeClick}
                                onEditStudentSubmit={this.onEditStudentSubmit}
                                onEditCampusSubmit={this.onEditCampusSubmit}
                                onSelectOption={this.onSelectOption}
                            />
                    )
                }



            </div>
        )
    }

}
