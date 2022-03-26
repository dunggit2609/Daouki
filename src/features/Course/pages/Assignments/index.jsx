import React from 'react';
import PropTypes from 'prop-types';
import CourseDetailAssignmentFilter from 'features/Course/components/CourseDetailAssignmentFilter';
import AssignmentList from 'features/Course/components/AssignmentList';
import './styles.scss'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams, useHistory } from 'react-router-dom';
import { _LIST_LINK } from 'constant/config';
import { Button } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useTranslation } from 'react-i18next';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenu } from 'components/DropdownMenu/DropdownMenu';
import { MenuItem } from '@mui/material';
import { useSnackbar } from 'notistack';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import testApi from 'core/API/testApi';
import { AxiosRequestConfig } from 'axios'
import axios from 'axios';
import AUTH from 'constant/auth';
Assignments.propTypes = {

};



function Assignments(props) {
    const { t } = useTranslation()
    const { courseId, testId } = useParams()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const { handleDisplaySpinner } = UseSpinnerLoading()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickBackToTest = () => {
        if (!courseId || !testId) {
            return
        }

        const url = _LIST_LINK.testDetail.replace(':courseId', courseId).replace(':testId', testId)
        history.push({ pathname: url })

    }

    const handleVisualize = () => {
        const route = _LIST_LINK.visualize.replace(':courseId', courseId).replace(':testId', testId)
        history.push({ pathname: route })
    }

    const handleExport = async () => {
        if (!testId) {
            return
        }

        try {
            handleDisplaySpinner(true)
            const response = await testApi.exportAssignments({ test_id: [testId] })
            // const link = document.createElement('a');
            // link.href = response.data.path;
            // const outputFilename = "Assignments Data.xlsx"
            // link.setAttribute('download', outputFilename);
            // document.body.appendChild(link);
            // link.click();
            window.open(response.data.path, "_blank")
            handleDisplaySpinner(false)
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }
    }

    const actions = [

        { icon: <InsertChartIcon />, name: t('button.visualize'), FabProp: { color: 'primary' }, action: handleVisualize },
        { icon: <SystemUpdateAltIcon />, name: 'Export', FabProp: { color: 'error' }, action: handleExport },
    ];

    return (
        <div className="assigment-container">
            <section className='assignment-page-title-container'>
                <div className="assignment-page-label">
                    <span className="back-to-test" onClick={handleClickBackToTest}><ArrowBackIosIcon /></span>
                    <span className="assignment-label" >
                        Assignments
                    </span>
                </div>
                <div className="assignment-visualize-button">
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
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
                        id="demo-customized-menu"
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
                </div>

            </section>
            <section className="course-detail__filter">
                <CourseDetailAssignmentFilter />
            </section>
            <section className="course-detail__data">
                <AssignmentList />
            </section>
        </div>
    );
}

export default Assignments;