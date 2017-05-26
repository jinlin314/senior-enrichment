import React, {Component} from 'react';

const List = (props) => {
    return(
        <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12">


            <div>
                <ul className="list-group">
                    {
                        props.students && props.students.map((student) => {
                            return (
                                <li className="list-group-item list-group-item-info" key={student.id}>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td width="70%">
                                                    <h3>
                                                        {student.name}
                                                    </h3>
                                                </td>
                                                <td width="15%">
                                                    <a onClick={()=>props.onDeleteStudent(student)} href="#" className="btn btn-info btn-lg">
                                                        <span id="trashIcon" className="glyphicon glyphicon-trash"></span>
                                                    </a>
                                                </td>
                                                <td width="15%">
                                                    <a onClick={()=>props.onEditStudent(student)} href="#" className="btn btn-info btn-lg">
                                                        <span id="trashIcon" className="glyphicon glyphicon-edit"></span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowSpan="3"><h5>{student.email}</h5></td>
                                            </tr>
                                        </tbody>
                                    </table>



                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;