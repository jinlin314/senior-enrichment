import React, {Component} from 'react';
import Form from '../components/Form';
import AddCampusForm from '../components/AddCampusForm';
import List from '../components/List';

const Sidebar = (props) => {
   // console.log('sidebar props: ', props);

    return (
        <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12">
            <sidebar>

                <section>
                    {
                        (props.formOption==='addCampus')?
                            (<AddCampusForm
                                onAddCampusSubmit={props.onAddCampusSubmit}
                            />):

                            (< Form
                                onAddStudentSubmit={props.onAddStudentSubmit}
                                campus={props.campus}
                            />)
                    }
                </section>
            </sidebar>
        </div>
    );
}
export default Sidebar;