import React, {Component} from 'react';

const Campuses = (props) => {

    return (

        <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
            <div>
                <h1>Margret Hamilton Institute</h1>
                <p>Explore our campuses below, meet our current instructors and students...</p>
            </div>

            <div className="row">

                {

                    props.campuses.map((campus) => {
                        return (
                            <div className="col-lg-5 col-md-4 col-sm-6 col-xs-12" key={campus.id}>
                                <a onClick={()=>props.onCampusesClick(campus)} href="#">
                                    <img src= {`${campus.imgUrl}`} className="img-circle img-responsive " />
                                </a>
                                <div className="caption">

                                        <a onClick={()=>props.onDeleteCampus(campus)} href="#" className="btn btn-info btn-lg">
                                            <span id="trashIcon" className="glyphicon glyphicon-trash"></span>{campus.name}
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
export default Campuses;