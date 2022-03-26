import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import { useSelector } from 'react-redux';
import { isEmpty } from 'core/utils/object';
import { Button, Grid, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { _LIST_LINK } from 'constant/config';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { DeleteForever } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenu } from 'components/DropdownMenu/DropdownMenu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
CourseInfo.propTypes = {

};

function CourseInfo(props) {
    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const { t } = useTranslation()
    const { courseId } = useParams()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeCourseName = (e) => {
        setCourseName(e.target.value)
    }

    const handleChangeCourseCode = (e) => {
        setCourseCode(e.target.value)
    }

    const handleVisualize = () => {
        if (!courseId) {
            return
        }

        const url = _LIST_LINK.visualizeCourse.replace(':courseId', courseId)
        history.push({ pathname: url })
    }
    const handleDeleteCourse = () => { }
    const handleCreateNewTest = () => {
        if (!courseId) {
            return
        }

        const url = _LIST_LINK.testCreate.replace(':courseId', courseId)
        history.push({ pathname: url })
    }

    const actions = [

        { icon: <AddCircleIcon />, name: t('button.add_new_test'), FabProp: { color: 'primary' }, action: handleCreateNewTest },
        { icon: <InsertChartIcon />, name: t('button.visualize'), FabProp: { color: 'primary' }, action: handleVisualize },
        // { icon: <DeleteForever />, name: t('button.delete'), FabProp: { color: 'error' }, action: handleDeleteCourse },
    ];

    const currentCourse = useSelector(state => state.course.curCourse)

    useEffect(() => {
        if (!currentCourse || isEmpty(currentCourse)) {
            return
        }
        setCourseName(currentCourse.courseName)
        setCourseCode(currentCourse.courseCode)
    }, [currentCourse])


    return (
        <div className="course-info-container">
            <Grid container>
                <Grid item xs={6} className=''>
                    <section className="course-info__code">
                        <input className="course-info__input-code" value={courseName} onChange={handleChangeCourseName} />
                    </section>
                    <section className="course-info__name">
                        <input className="course-info__input-name" value={courseCode} onChange={handleChangeCourseCode} />
                    </section>
                </Grid>
                <Grid item xs={6} className='course-info__item--more-button'>
                    <Button
                        aria-controls={open ? 'course-info-more' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {t('more_feature')}
                    </Button>
                    <StyledMenu
                        id="course-info-more"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {actions.map(action => <MenuItem key={action.name} onClick={action.action}>
                            {action.icon}
                            {action.name}
                        </MenuItem>)}


                    </StyledMenu>
                </Grid>
            </Grid>



        </div>
    );
}

export default CourseInfo;