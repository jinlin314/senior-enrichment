import React, {Component} from 'react';

const Form = (props) => {
    // console.log("Form props: ", props);
    return (
        <div className="container">
            <form id="signup" onSubmit={props.onAddStudentSubmit}>
                <div className="header">
                    <h4>ADD STUDENT</h4>
                    <p className="text-danger">* fields are required</p>
                </div>

                <div className="sep"></div>

                <div className="inputs">
                    <input name ="name" type="name" placeholder="Enter Name" autoFocus />
                </div>

                <div className="inputs">
                    <input name ="email" type="email" placeholder="Enter e-mail"  />
                </div>

                <input type="hidden" value={props.campus.id} name="campusId" />

                <div className="inputs">
                    <button name="add" type="submit" className="btn-success">SUBMIT</button>
                </div>
            </form>
        </div>

    );
}
export default Form;