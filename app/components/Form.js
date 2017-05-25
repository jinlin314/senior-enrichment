import React, {Component} from 'react';

const Form = (props) => {
    return (
        <div className="container">
            <form id="signup">
                <div className="header">
                    <h4>ADD INSTRUCTOR</h4>
                    <p className="text-danger">* fields are required</p>
                </div>

                <div className="sep"></div>

                <div className="inputs">
                    <input name ="name" type="name" placeholder="Enter Name" autofocus />
                </div>

                <div className="inputs">
                    <input name ="email" type="email" placeholder="Enter e-mail"  />
                </div>

                <div className="inputs">
                    <a id="submit" name="add" >SUBMIT</a>

                </div>
            </form>
        </div>

    );
}
export default Form;