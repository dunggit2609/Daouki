import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Add } from '@material-ui/icons';
import { _LIST_LINK } from 'constant/config';
import './styles.scss'
NoCourse.propTypes = {

};

function NoCourse(props) {
    const { t } = useTranslation()
    const addNewCoursePath = _LIST_LINK.addNewCourse

    return (
        <div className='no-course-container'>
            <section className="course__info">
                <div className="course__desc">
                    {t('course_desc')}
                </div>
                <div className="course__add-new-course">
                    {t('course_add_new')}
                </div>
            </section>
            <section className='course__add-new'>
                <Link to={addNewCoursePath} className="decoration-none">
                    <Button style={{ width: 100 + '%' }} variant="contained" endIcon={<Add />}>
                        {t('button.add_new_course')}
                    </Button>
                </Link>
            </section>
        </div>
    );
}

export default NoCourse;