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
                                                <td width="85%">
                                                    <h3>
                                                        {student.name}
                                                    </h3>
                                                </td>
                                                <td>
                                                    <a onClick={()=>props.onDeleteStudent(student)} href="#" className="btn btn-info btn-lg">
                                                        <span id="trashIcon" className="glyphicon glyphicon-trash"></span> Trash
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowSpan="2"><h5>{student.email}</h5></td>
                                            </tr>
                                        </tbody>
                                    </table>



                                </li>
                            )
                        })
                    }
                    {/*<li className="list-group-item list-group-item-success">Jin Lin</li>*/}
                    {/*<li className="list-group-item list-group-item-info">YiLing Jian</li>*/}
                    {/*<li className="list-group-item list-group-item-warning">Karen</li>*/}
                    {/*<li className="list-group-item list-group-item-danger">Dan</li>*/}
                </ul>
            </div>
        </div>
    );
}

export default List;