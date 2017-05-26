import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './List';

const Campus = (props) => {
    return (

            <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                <div>
                    <h1>{props.campus.name} Campus</h1>
                    <p>meet our current instructors and students...</p>
                </div>

                <section>

                    <div id="btn-group" className="button-group">
                        <button type="button" className="btn btn-primary">Instuctors</button>
                        <button type="button" className="btn btn-primary">Students</button>
                        <button type="button" className="btn btn-primary">+</button>
                    </div>

                </section>

                <List
                    students={props.students }
                    onDeleteStudent={props.onDeleteStudent}

                />
            </div>

    );
}
export default Campus;