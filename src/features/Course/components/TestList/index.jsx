import PropTypes from 'prop-types';
import './styles.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { useQuery } from 'hooks/useQuery';
import qs from 'query-string'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isEmpty } from 'core/utils/object';
import format from 'date-fns/format/index';
import { Checkbox } from '@material-ui/core';
import { _LIST_LINK } from 'constant/config';
import { RESULT_TYPE_IMAGE, RESULT_TYPE_FILE, RESULT_TYPE_INPUT } from 'features/Course/constant/resultType';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import noData from 'assets/images/no_data.png'

import CloseIcon from '@mui/icons-material/Close';
TestList.propTypes = {

};

function TestList(props) {
    const { t } = useTranslation()
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(1)
    const query = useQuery()
    const history = useHistory()
    const location = useLocation()
    const { courseId } = useParams()
    const columns = [
        {
            name: t('create_test.test_name'),
            id: 'testName',
            minWidth: 300
        },
        {
            name: t('create_test.result_type'),
            id: 'test_answer_type',
            minWidth: 100
        },
        {
            name: t('create_test.multiple_choice'),
            id: 'is_multiple_choice',
            minWidth: 150
        },

        {
            name: t('created_at'),
            id: 'createdAt',
            minWidth: 150
        },

        {
            name: t('status.label'),
            id: 'status',
            minWidth: 100
        },
    ]
    const handleChangePage = (event, newPage) => {

        setPage(newPage);
        const newQuery = { ...query, page: newPage }
        handleChangeQuery(newQuery)
    };
    const handleChangeQuery = (query) => {
        const searchString = qs.stringify(query)
        history.push({ pathname: location.pathName, search: searchString })
    }
    const handleChangeRowsPerPage = (event) => {
        const size = parseInt(event.target.value, 10)
        setRowsPerPage(size);
        setPage(1);
        const newQuery = { ...query, page: 1, size: size }
        handleChangeQuery(newQuery)
    };

    const handleRowClick = (row, index) => {
        history.push({ pathname: `${_LIST_LINK.course}/${courseId}/test/${row.testId}` })
    }

    const getDateTimeFormat = (date) => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm')

    }

    const getResulType = (type) => {
        switch (type) {
            case RESULT_TYPE_IMAGE:
                return 'Image'
            case RESULT_TYPE_FILE:
                return 'File'
            case RESULT_TYPE_INPUT:
                return 'Input from UI'
            default:
                return
        }
    }

    const tests = useSelector(state => state.test.tests)
    useEffect(() => {
        if (isEmpty(tests) || tests.totalItems === 0) {
            setPageCount(1)
            return
        }
        const mod = tests.totalItems % rowsPerPage

        const div = Math.floor(tests.totalItems / rowsPerPage)
        if (mod === 0) {
            setPageCount(div)
        } else {
            setPageCount(div + 1)
        }


    }, [tests])

    useEffect(() => {
        if (!query.size && !query.page) {
            return
        }
        setPage(+query.page || 1)
        setRowsPerPage(+query.size || 10)
    }, [])
    return (
        <div className='test-data__container'>

            <TableContainer component={Paper} sx={{ maxHeight: 400 }} className='scroll-custom'>
                <Table sx={{ minWidth: 800 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow >
                            {columns && columns.length > 0 && columns.map(c => <TableCell style={{ minWidth: c.minWidth }} key={c.id} className='header' align={['is_multiple_choice'].includes(c.id) ? 'center' : 'left'}
                            >
                                {c.name}
                            </TableCell>)}
                        </TableRow>
                    </TableHead>
                    {
                        <TableBody >
                            {tests && tests.items && tests.items.length > 0 ? tests.items.map((row, index) => (
                                <TableRow
                                    key={row.testId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => handleRowClick(row, index)}
                                    hover={true}
                                    className='body-row'
                                >
                                    {columns.map(c => {
                                        return <TableCell key={c.id}
                                            align={['is_multiple_choice'].includes(c.id) ? 'center' : 'left'}

                                        >
                                            {
                                                c.id === 'test_answer_type' && row['testConfig']
                                                    ? getResulType(row['testConfig'][c.id])
                                                    : (c.id === 'createdAt'
                                                        ? getDateTimeFormat(row[c.id])
                                                        : c.id === 'status'
                                                            ? <Chip icon={row[c.id] === 'new' ? <InfoIcon /> : <CheckOutlinedIcon />}
                                                                variant='outlined' color={row[c.id] === 'new' ? 'primary' : 'success'}
                                                                label={row[c.id] === 'new' ? t('status.new') : t('status.graded')} />
                                                            : c.id === 'is_multiple_choice' && row['testConfig']
                                                                // ? getMultiple(row['testConfig'][c.id])
                                                                ? (row['testConfig'][c.id] ? <CheckOutlinedIcon /> : <CloseIcon />)
                                                                : row[c.id])
                                            }</TableCell>
                                    })}
                                </TableRow>
                            )) : <TableRow className="no-data" >
                                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                                    <img src={noData} />

                                </TableCell>
                            </TableRow>
                            }
                        </TableBody>

                    }
                </Table>
            </TableContainer>
            <Grid container spacing={2} className='pagination'>
                <Grid item xs={6}>
                    <Select
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        size='small'
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6} className='pagination__nav'>
                    <Pagination count={pageCount} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
                </Grid>
            </Grid>
        </div>
    );
}

export default TestList;
