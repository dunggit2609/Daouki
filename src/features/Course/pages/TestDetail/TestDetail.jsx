import React from 'react';
import './styles.scss'
import { Button, Grid, Menu, Paper, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DeleteForever } from '@mui/icons-material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import GradingIcon from '@mui/icons-material/Grading';
import { useEffect } from 'react';
import { getTestDetail } from 'core/redux/testSlice';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import TestDetailForm from 'features/Course/components/TestDetailForm';
import { _LIST_LINK } from 'constant/config';
import { useHistory } from 'react-router';
import ListIcon from '@mui/icons-material/List';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { StyledMenu } from 'components/DropdownMenu/DropdownMenu';

TestDetail.propTypes = {

};
// const StyledMenu = styled((props) => (
//     <Menu
//         elevation={0}
//         anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//         }}
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}
//         {...props}
//     />
// ))(({ theme }) => ({
//     '& .MuiPaper-root': {
//         borderRadius: 6,
//         marginTop: theme.spacing(1),
//         minWidth: 180,
//         color:
//             theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//         boxShadow:
//             'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//         '& .MuiMenu-list': {
//             padding: '4px 0',
//         },
//         '& .MuiMenuItem-root': {
//             '& .MuiSvgIcon-root': {
//                 fontSize: 18,
//                 color: theme.palette.text.secondary,
//                 marginRight: theme.spacing(1.5),
//             },
//             '&:active': {
//                 backgroundColor: alpha(
//                     theme.palette.primary.main,
//                     theme.palette.action.selectedOpacity,
//                 ),
//             },
//         },
//     },
// }));
function TestDetail(props) {
    const { t } = useTranslation()
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { testId, courseId } = useParams()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAssign = () => {
        const url = _LIST_LINK.assginmentCreate.replace(':courseId', courseId).replace(':testId', testId)

        history.push({ pathname: url })
    }
    const handleViewAssignment = () => {
        const url = _LIST_LINK.viewAssignment.replace(':courseId', courseId).replace(':testId', testId)
        history.push({ pathname: url })

    }
    const handleDeleteTest = () => {
    }
    const handleVisualize = () => {
        const route = _LIST_LINK.visualize.replace(':courseId', courseId).replace(':testId', testId)
        history.push({ pathname: route })

    }
    const actions = [
        { icon: <GradingIcon />, name: t('button.assign'), FabProp: { color: 'primary' }, action: handleAssign },
        { icon: <ListIcon />, name: t('button.view_assignments'), FabProp: { color: 'primary' }, action: handleViewAssignment },
        { icon: <InsertChartIcon />, name: t('button.visualize'), FabProp: { color: 'primary' }, action: handleVisualize },
        // { icon: <DeleteForever />, name: t('button.delete'), FabProp: { color: 'error' }, action: handleDeleteTest },
    ];

    const handleClickBackToAssignment = () => {
        if (!courseId) {
            return
        }

        const url = _LIST_LINK.courseDetail.replace(':courseId', courseId)
        history.push({ pathname: url })

    }
    useEffect(async () => {
        if (!testId) {
            return
        }

        const action = getTestDetail(testId)
        try {
            handleDisplaySpinner(true)
            const rs = await dispatch(action)
            unwrapResult(rs)
            handleDisplaySpinner(false)
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }
    }, [])
    return (
        <div className='test-detail-container'>
            <Grid container spacing={2}>
                <Grid item xs={12} className='test-detail__header'>
                    <section className='assignment-page-label'>
                        <span className="back-to-test" onClick={handleClickBackToAssignment}><ArrowBackIosIcon /></span>
                        <span className="assignment-label" >
                            {t('test_detail.label')}
                        </span>
                    </section>
                    <span>

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
                    </span>
                </Grid>
                <Grid item xs={12}>
                    <Paper className='test-form__container'>
                        <TestDetailForm />
                    </Paper>
                </Grid>

            </Grid>

        </div>
    );
}

export default TestDetail;