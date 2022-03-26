import React from 'react';
import PropTypes from 'prop-types';
import CreateTestForm from 'features/Course/components/CreateTestForm';
import './styles.scss'
import { makeStyles } from '@material-ui/core/styles';
CreateTest.propTypes = {
    
};

function CreateTest(props) {
    return (
        <div className='create-test-container'>
            <CreateTestForm />
        </div>
    );
}

export default CreateTest;