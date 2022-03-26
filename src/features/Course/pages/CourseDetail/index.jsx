import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CourseInfo from 'features/Course/components/CourseInfo';
import './style.scss'
import CourseContent from 'features/Course/components/CourseContent';
import { useDispatch } from 'react-redux';
import { getDetailSlice } from 'core/redux/courseSlice';
import { useParams } from 'react-router-dom';
CourseDetail.propTypes = {

};

function CourseDetail(props) {
    const dispatch = useDispatch()
    const {courseId} = useParams()
    useEffect(() => {
        if (!courseId) {
            return
        }
        const action = getDetailSlice(courseId)
        dispatch(action)
    }, [courseId])
    return (
        <div className="course-detail-container">
            <section className="course-info">
                <CourseInfo />
            </section>
            <section className="course-content">
                <CourseContent />
            </section>
        </div>
    );
}

export default CourseDetail;