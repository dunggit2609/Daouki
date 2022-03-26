import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Search from 'components/Search';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import './styles.scss'
import { InputAdornment } from '@material-ui/core';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { TEST_STATUS_GRADED, TEST_STATUS_NEW } from 'features/Course/constant/testStatus';
import { format } from 'date-fns'
import { getAllTest } from 'core/redux/testSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import { COURSE_DETAIL_TEST_TAB } from 'features/Course/constant/tabs';
import qs from 'query-string'
import { _LIST_LINK } from 'constant/config';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
CourseDetailFilter.propTypes = {

};

function CourseDetailFilter(props) {
    const [date, setDate] = useState([null, null]);
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const { t } = useTranslation()
    const dateFormat = "dd/MM/yyyy"
    const statuses = [{ label: t('status.new'), id: TEST_STATUS_NEW }, { label: t('status.graded'), id: TEST_STATUS_GRADED }, { label: 'All', id: 'all' }]
    const dispatch = useDispatch()
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();
    const { courseId } = useParams()
    const { tab, size, page } = useQuery()
    const history = useHistory()
    const location = useLocation()
    const match = useRouteMatch()
    const filter = {
        page: 1,
        size: 50,
        status: '',
        name: '',
        start_date: '',
        end_date: '',

    }
    const handleChangeSearch = (searchString) => {
        setSearch(searchString)
    }
    const curCourse = useSelector(state => state.course.curCourse)
    useEffect(async () => {
        if (!courseId  || match.path !== _LIST_LINK.courseDetail) {
            return
        }
        fetchData()

    }, [curCourse, tab, size, page, location.pathName])
    const handleView = () => {
        filter.name = search
        filter.start_date = date[0] ? format(date[0], 'dd-MM-yyyy') : ''
        filter.end_date = date[1] ? format(date[1], 'dd-MM-yyyy') : ''
        filter.status = status === 'all' ? '' : status
        const query = { ...filter, size: size, page: page, tab: tab }
        query.start_date = filter.start_date
        query.end_date = filter.end_date
        const searchString = qs.stringify(query)
        history.push({ pathname: location.pathName, search: searchString })
        fetchData()
    }

    const handleClearDate = (type) => {
        const [start, end] = date
        const dummy = [null, null]
        switch (type) {
            case 'start':
                dummy[1] = end;
                break;
            case 'end':
                dummy[0] = start;
                break
            default:
                break
        }

        setDate(dummy)
    }

    const fetchData = async () => {
        const payload = {
            courseId: courseId,
            filter: {
                ...filter, size: size ? size : 10, page: page ? page : 1
            }
        }
        const action = getAllTest(payload)
        try {
            handleDisplaySpinner(true)
            const rs = await dispatch(action)
            unwrapResult(rs)
            handleDisplaySpinner(false)
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }
    }
    return (
        <div className='course-detail-filter__container'>
            <div className="search">
                <Search onChange={handleChangeSearch} value={search} />
            </div>
            {
                //tách component status và date
            }
            <div className="status">
                {/* <InputLabel id="select-test-status">Status</InputLabel> */}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>

                    <Select
                        labelId="select-test-status"
                        label='status'
                        value={status}
                        onChange={(event) => {
                            setStatus(event.target.value);
                        }}
                        fullWidth
                        size='small'
                    >
                        {statuses && statuses.length > 0 && statuses.map(s => <MenuItem key={s.id} value={s.id}>{s.label}</MenuItem>)}

                    </Select>
                </FormControl>



            </div>
            <div className="date-range">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText={t('from_date')}
                        endText={t('to_date')}
                        inputFormat={dateFormat}
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue)
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <>
                                                {
                                                    date[0] && <InputAdornment style={{cursor: 'pointer'}} position="end" size='small' onClick={() => handleClearDate('start')}>
                                                        <CloseIcon />
                                                    </InputAdornment>
                                                }
                                            </>


                                        ),
                                    }}
                                />
                                <Box sx={{ mx: 1 }}></Box>
                                <TextField {...endProps}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <>
                                            {
                                                date[1] && <InputAdornment style={{cursor: 'pointer'}} position="end" size='small' onClick={() => handleClearDate('end')}>
                                                    <CloseIcon />
                                                </InputAdornment>
                                            }
                                        </>
                                        ),
                                    }}
                                />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </div>

            <div className="view">
                <Button onClick={handleView} variant="outlined" startIcon={<VisibilityIcon />}>{t('button.view')}</Button>

            </div>
        </div>
    );
}

export default CourseDetailFilter;