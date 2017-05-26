import React, {Component} from 'react';

const EditCampus = (props) => {
    console.log("EditCampus props: ", props);

    return (
        <div className="container">
            <form id="signup" onSubmit={props.onEditCampusSubmit}>
                <div className="header">
                    <h4>Edit {props.campus.name} Campus Info</h4>
                    <p className="text-danger">* fields are required</p>
                </div>

                <div className="sep"></div>

                <div className="inputs">
                    <input name ="name" type="name" placeholder="Enter Camus Name" autoFocus />
                </div>

                <div className="inputs">
                    <input name ="imgUrl" type="file"   />
                </div>

                <input type="hidden" value={props.campus.id} name="campusId" />

                <div className="inputs">
                    <button name="add" type="submit" className="btn-success">SUBMIT</button>
                </div>
            </form>
        </div>
    );
}
export default EditCampus;