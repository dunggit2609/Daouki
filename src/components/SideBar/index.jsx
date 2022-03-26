import React, { useCallback } from 'react';
import './style.scss'
import Search from 'components/Search';
import Courses from 'features/Course/components/Courses';
import { useTranslation } from 'react-i18next';
import _debounce from 'lodash/debounce';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
import { getAllCourseSlice } from 'core/redux/courseSlice';
import FilterListIcon from '@mui/icons-material/FilterList';

function SideBar(props) {
    const {t} = useTranslation()
    const [search, setSearch] = useState('')

    const { enqueueSnackbar } = useSnackbar();
    const { handleDisplaySpinner } = UseSpinnerLoading()

    const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);
    const dispatch = useDispatch()
    const filter = {
        size: 50,
        page: 1
    }
    async function  handleDebounceFn(inputValue) {
        const action = getAllCourseSlice({...filter, name: inputValue})
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

    const handleSearch = (value) => {
        setSearch(value)
        debounceFn(value)
    }

    return (
        <div className="sidebar">
            <div className="sidebar__title">
            <span className='mr-8 d-flex align-items-center'> <FilterListIcon /> </span> {t('list_of_course')}
                {/* <span className='sidebar-course__title'></span> */}
            </div>
            <div className="sidebar__search">
              <Search search={search} onChange={handleSearch}/>
            </div>
            <div className="sidebar__list-class">
                <Courses />
            </div>
        </div>
    );
}

export default SideBar;