import React, {Component} from 'react';

const List = (props) => {
    return(
        <div className="container">

            <div id="btn-group" class="btn-group">
                <button type="button" className="btn btn-primary">Students</button>
                <button type="button" className="btn btn-primary">Instructors</button>
            </div>
            <div>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-success">Jin Lin</li>
                    <li className="list-group-item list-group-item-info">YiLing Jian</li>
                    <li className="list-group-item list-group-item-warning">Karen</li>
                    <li className="list-group-item list-group-item-danger">Dan</li>
                </ul>
            </div>
        </div>
    );
}

export default List;