import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { COURSE_DETAIL_TEST_TAB, COURSE_DETAIL_SUBMISSION_TAB } from 'features/Course/constant/tabs';
import TabList from 'components/Tabs/TabList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './style.scss'
import { useTranslation } from 'react-i18next';
import qs from 'query-string';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from 'hooks/useQuery';
import { _LIST_LINK } from 'constant/config';

CourseContentHandler.propTypes = {

};

function CourseContentHandler(props) {
    return (
        <div className="content-handler-container">
            {/* <section className="content__tab">
                <TabList data={tabs} selected={selectedTab} handleChangeTab={handleChangeTab} />
            </section> */}
            <section className="content__action">
            {/* <Button startIcon={<AddIcon />} variant="contained" onClick={handleCreateNewTest}>Add new test</Button> */}

            </section>
        </div>
    );
}

export default CourseContentHandler;