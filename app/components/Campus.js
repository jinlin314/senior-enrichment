import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const Campus = (props) => {
    return (

            <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                <div class="jumbotron">
                    <h1>Grace Hopper Campuses</h1>
                    <p>Explore our campuses below, meet our current instructors and students...</p>
                </div>

                <div className="row">
                    <img src="img/mars.svg" className="img-circle img-responsive col-lg-5 col-md-4 col-sm-6 col-xs-12"/>
                    <img src="img/terra.svg" className="img-circle img-responsive col-lg-5 col-md-4 col-sm-6 col-xs-12"/>
                </div>
                <div className="row">
                    <img src="img/luna.svg" className="img-circle img-responsive col-lg-5 col-md-4 col-sm-6 col-xs-12"/>
                    <img src="img/titan.svg" className="img-circle img-responsive col-lg-5 col-md-4 col-sm-6 col-xs-12"/>
                </div>
            </div>

    );
}
export default Campus;