import React, {Component} from 'react';
import store from '../store';
import {getAllCampuses} from '../action-creators/campuses';
import {getStudentForCampus} from '../action-creators/students';
import _ from 'lodash';

export default class Campuses extends Component{
    constructor(props){
        super()
    }

    // componentDidMount () {
    //     this.props.setCampuses();
    // }

    componentWillReceiveProps(nextProps){
        let currentCampuses = this.props.campuses;
        let nextCampuese = nextProps.campuses;
        if (! _.isEqual(currentCampuses, nextCampuese)){
            this.props.setCampuses();
        }

    }




    render(){

        return (

            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div>
                    <h1>Margret Hamilton Institute</h1>
                    <p>Explore our campuses below, meet our current instructors and students...</p>
                </div>

                <div className="row">

                    {

                        this.props.campuses.map((campus) => {
                            return (
                                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12" key={campus.id}>
                                    <a onClick={() => this.props.onCampusesClick(campus)} href="#">
                                        <img src={`${campus.imgUrl}`} className="img-circle img-responsive "/>
                                    </a>
                                    <div className="caption">

                                        <a onClick={() => this.props.onDeleteCampus(campus)} href="#"
                                           className="btn btn-info btn-lg">
                                            <span id="trashIcon" className="glyphicon glyphicon-trash"></span>
                                        </a>

                                        <a onClick={() => this.props.onEditCampus(campus)} href="#"
                                           className="btn btn-info btn-lg">
                                            <span id="trashIcon" className="glyphicon glyphicon-edit"></span>{campus.name}
                                        </a>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        );
    }
}
// export default Campuses;