import React, {Component} from 'react';
import Form from '../components/Form';
import List from '../components/List';

const Sidebar = (props) => {
    return (
        <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12">
            <sidebar>
                <section>


                    <List />

                    <Form />
                    ​
                </section>
            </sidebar>
        </div>
    );
}
export default Sidebar;