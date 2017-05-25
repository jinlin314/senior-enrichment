import React, {Component} from 'react';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">GraceHopper</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><a href="#">Home</a></li>
                    <li><a href="#">Student Life</a></li>
                    <li><a href="#">Sign Up</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;