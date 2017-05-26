
import React, {Component} from 'react';
import Home from '../components/Home';
import EditForm from '../components/EditForm';
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
            editMode: null
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
        this.setCampuses = this.setCampuses.bind(this);
    }

    componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        store.dispatch(getAllCampuses());
        store.dispatch(getAllStudents());
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    // click on one of the campuses,
    // set the state campus to selected campus, when state.campus is not null,
    // it will render the single campus component
    // set the forOption to 'addStudent', side bar will render the add student form for selected campus
    onCampusesClick(campus){
        this.setState({campus: campus});
        this.setState({formOption: 'addStudent'});
        store.dispatch(getStudentForCampus(campus.id));

    }

    //click Home button on the navbar, set campus=null, editMode=null,
    // this will re-render the home to all campuses page
    // set the form option to 'addCampus', side bar will render add campus form
    onHomeClick(){
        this.setState({campus: null});
        this.setState({editMode: null});
        this.setState({formOption: 'addCampus'});
    }

    // using the backend api route to add new student to db,
    // the student info is obtained from the form
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

        alert("New Student Added!");

        store.dispatch(getAllCampuses());
    }

    // =========add a campus===========
    // using the backend api route to add new campus to db,
    // the campus info is obtained from the form
    // dispatch the getAllCampus action to update the campuses state

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

        store.dispatch(getAllCampuses());

    }


    // using backend route to delete targeted student
    //=====delete a student =====//
    onDeleteStudent (student){
        var studentId = student.id
        axios.delete(`api/students/${studentId}`)
            .then(res => res.data)
            .catch(console.error);

        store.dispatch(getAllCampuses());
        alert(student.name + " is deleted:(");
    }


    //=====delete a campus =====//
    // before delete the targeted campus, delete all its associated students first

    onDeleteCampus (campus){
        var campustId = campus.id
        axios.delete(`api/students/all/${campustId}`)
            .then(()=>console.log('students deleted'))
            .catch(console.error);

        axios.delete(`api/campuses/${campustId}`)
            .catch(console.error);

        store.dispatch(getAllCampuses());

        // alert(campus.name + " is deleted:(");
    }


    //======Edit campus========//
    // click on the edit button, set the campus to seleted campus
    // set the editMode to editCampus, so the DOM will render edit campus form

    onEditcampus (campus){
        this.setState({campus: campus});
        this.setState({editMode: 'editCampus'});
    }

    // call backend put route to update a campus, get the new info from the form
    // after updated, set the campus and editMode to null, this will trigger DOM to
    // re-render campuses component

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
    // click on the edit button, set the campus to seleted student
    // set the editMode to editCampus, so the DOM will render edit campus form

    onEditStudent (student){
        console.log('this is edit student click handler');
        this.setState({student: student});
        this.setState({editMode: 'editStudent'});
    }

    // call backend put route to update a student, get the new info from the form
    // after updated, set the student and editMode to null, this will trigger DOM
    // to re-render campus component
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


    // re-set the campuses state, used in the componentWillReceiveProps in campuses component
    // so the DOM will auto re-render after change is made

    setCampuses (){
        // store.dispatch(getAllCampuses());
        axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => this.setState({campuses:campuses}))
            .catch(console.error);
    }


// if the editMode is null, render the Home Component,
// which will render navbar, campuses page, sidebar by default
// else, render the Edit component, depend on the editMode, it will render the corresponding form
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
                              setCampuses={this.setCampuses}
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
