import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Add } from '@material-ui/icons';
import './style.scss'
import { NavLink, useRouteMatch, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _LIST_LINK } from 'constant/config';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
function Courses(props) {
    const [showAddCourseButton, setShowAddCourseButton] = useState(true)
    const rootPath = useRouteMatch()
    const addNewCoursePath = _LIST_LINK.addNewCourse
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === addNewCoursePath) {
            setShowAddCourseButton(false)
        } else {
            setShowAddCourseButton(true)
        }

    }, [location.pathname]);

    const data = useSelector(state => state.course.courses);
    return (
        <div className="class">

            {showAddCourseButton && <>
                <div className="class__add-class">
                    <Link to={addNewCoursePath} className="decoration-none">
                        <Button style={{ width: 100 + '%' }} variant="text" startIcon={<Add />}>
                            Add new course
                        </Button>
                    </Link>
                </div>
            </>}



            {
                data && data.items && data.items.length > 0 &&
                <>
                    <ul className="class__list">
                        {
                            data.items.map(c =>
                                <li className="list-style-none" key={c.courseId}>
                                    <NavLink activeClassName="activelass" className="class__item pointer d-flex align-items-center justify-content-start" to={`${rootPath.path}/${c.courseId}`}>
                                        <span className='course-icon'>
                                            <ClassOutlinedIcon />
                                        </span>
                                        <span>
                                            {c.courseName}
                                        </span>
                                    </NavLink>
                                </li>

                            )
                        }
                    </ul>
                </>
            }


        </div>
    );
}

export default Courses;