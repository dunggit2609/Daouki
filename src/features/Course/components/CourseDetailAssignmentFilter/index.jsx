import React, { useState, useEffect } from 'react';

import './styles.scss'

import { getAllAssignment } from 'core/redux/assignmentSlice';
import Search from 'components/Search';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { InputAdornment } from '@material-ui/core';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import qs from 'query-string'
import { _LIST_LINK } from 'constant/config';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
CourseDetailAssignmentFilter.propTypes = {

};

function CourseDetailAssignmentFilter(props) {
    const [date, setDate] = useState([null, null]);
    const [search, setSearch] = useState('')
    const { t } = useTranslation()
    const dateFormat = "dd/MM/yyyy"
    const dispatch = useDispatch()
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();
    const { size, page } = useQuery()
    const { courseId, testId } = useParams()
    const history = useHistory()
    const location = useLocation()
    const filter = {
        page: 1,
        size: 50,
        name: '',
        start_date: '',
        end_date: '',

    }
    const handleChangeSearch = (searchString) => {
        setSearch(searchString)
    }
    useEffect(async () => {
        if (!courseId || !testId) {
            return
        }
        //config size và page
        fetchData()

    }, [courseId, testId, size, page])

    const fetchData =  async () => {
        const payload = {
            filter: {
                course_id: courseId,
                test_id: testId,
            },
            size: size ? size : 10,
            page: page ? page : 1,
            student_id: filter.name,
            start_date: filter.start_date,
            end_date: filter.end_date
        }
        const action = getAllAssignment(payload)
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
    const handleView = () => {
        filter.name = search

        filter.start_date = date[0] ? format(date[0], 'dd-MM-yyyy') : ''
        filter.end_date = date[1] ? format(date[1], 'dd-MM-yyyy') : ''
        const query = { ...filter, size: size, page: page }
        query.start_date = filter.start_date
        query.end_date = filter.end_date
        const searchString = qs.stringify(query)

        fetchData()
        history.push({ pathname: location.pathName, search: searchString })
    }
    return (
        <div className='course-detail-filter__container'>
            <div className="search">
                <Search onChange={handleChangeSearch} value={search} />
            </div>
            {
                //tách component status và date
            }
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
                                                    date[0] && <InputAdornment style={{ cursor: 'pointer' }} position="end" size='small' onClick={() => handleClearDate('start')}>
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
                                                    date[1] && <InputAdornment style={{ cursor: 'pointer' }} position="end" size='small' onClick={() => handleClearDate('end')}>
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

export default CourseDetailAssignmentFilter;