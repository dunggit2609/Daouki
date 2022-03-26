import React from 'react';
import PropTypes from 'prop-types';
import CreateSubmission from 'features/Course/components/CreateSubmission';
import './styles.scss'
CreateSubmissionPage.propTypes = {
    
};

function CreateSubmissionPage(props) {
    return (
        <div className='create-submission-container'>
            <CreateSubmission />
        </div>
    );
}

export default CreateSubmissionPage;