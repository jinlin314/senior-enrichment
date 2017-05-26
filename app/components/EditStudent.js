import React, {Component} from 'react';

const EditStudent = (props) => {
    console.log("EditStudent props: ", props);

    return (
            <div className="container">
                <form id="signup" onSubmit={props.onEditStudentSubmit}>
                    <div className="header">
                        <h4>Edit {props.student.name}'s Info</h4>
                    </div>

                    <div className="sep"></div>

                    <div className="inputs">
                        <input name ="name" type="name" placeholder="Enter Student Name" autoFocus />
                    </div>

                    <div className="inputs">
                        <input name ="email" type="email" placeholder="Enter Student Email"  />
                    </div>

                    <div className="inputs">
                        <select name ="campus">
                            {
                                props.campuses && props.campuses.map(campus => {
                                    return (
                                        <option key={campus.id} onSelect={props.onSelectOption} value={campus.id}>{campus.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="inputs">
                        <button name="add" type="submit" className="btn-success">SUBMIT</button>
                    </div>
                </form>
            </div>
    );
}
export default EditStudent;