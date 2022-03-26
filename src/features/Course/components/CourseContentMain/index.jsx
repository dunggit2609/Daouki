import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss'
import { useTranslation } from 'react-i18next';
import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from 'hooks/useQuery';
import CourseDetailFilter from '../CourseDetailFilter';
import TestList from '../TestList';
import { COURSE_DETAIL_TEST_TAB } from 'features/Course/constant/tabs';
import AssignmentList from '../AssignmentList';
import CourseDetailAssignmentFilter from '../CourseDetailAssignmentFilter';

function CourseContentMain(props) {

    return (
        <div className="course-main-content-container">
            <section className="course-detail__filter">
                <CourseDetailFilter />
            </section>
            <section className="course-detail__data">
                <TestList />
            </section>
        </div>
    );
}

export default CourseContentMain;