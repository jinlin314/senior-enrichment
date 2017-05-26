import React, {Component} from 'react';

const AddCampusForm = (props) => {
    console.log("addCampus Form props: ", props);

    return (
        <div className="container">
            <form id="signup" onSubmit={props.onAddCampusSubmit}>
                <div className="header">
                    <h4>ADD CAMPUS</h4>
                    <p className="text-danger">* fields are required</p>
                </div>

                <div className="sep"></div>

                <div className="inputs">
                    <input name ="name" type="name" placeholder="Enter Name" autoFocus />
                </div>

                <div className="inputs">
                    <input id="image-file" type="file" name="img" />
                </div>

                <div className="inputs">
                    <button name="add" type="submit" className="btn-success">SUBMIT</button>
                </div>
            </form>
        </div>

    );
}
export default AddCampusForm;