
import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Campus from '../components/Campus';


export default class Home extends Component {
    constructor(){
        super();
    }


    render(){
        return (
            <div id="main" className="container-fluid">
                <Navbar />

                <Campus />

                <Sidebar/>
            </div>

        )
    }

}