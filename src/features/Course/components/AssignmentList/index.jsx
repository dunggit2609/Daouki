import PropTypes from 'prop-types';
import './styles.scss'
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, IconButton, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import format from 'date-fns/format';
import { isEmpty } from 'core/utils/object';
import { useState, useEffect } from 'react';
import { useQuery } from 'hooks/useQuery';
import qs from 'query-string'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import ImageIcon from '@mui/icons-material/Image';
import noData from 'assets/images/no_data.png'
import Lightbox from 'react-image-lightbox';

function AssignmentList(props) {
    const { t } = useTranslation()
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(1)
    const [isOpenLightBox, setIsOpenLightBox] = useState(false)
    const [curUrl, setCurUrl] = useState('')
    const query = useQuery()
    const location = useLocation()
    const history = useHistory()
    const columns = [
        {
            name: t('student_id'),
            id: 'studentId',
            minWidth: 150
        },
        {
            name: t('grade'),
            id: 'grade',
            minWidth: 150
        },

        {
            name: 'Correct answer',
            id: 'correctAnswer',
            minWidth: 150
        },
        {
            name: 'Test code',
            id: 'testCode',
            minWidth: 150
        },
        {
            name: t('image'),
            id: 'imageUrl',
            minWidth: 150
        },
        {
            name: t('created_at'),
            id: 'createdAt',
            minWidth: 150
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
    const getDateTimeFormat = (date) => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm')

    }

    const handleViewLightBox = (url) => {
        setIsOpenLightBox(true)
        setCurUrl(url)
    }

    const assignments = useSelector(state => state.assignment.assignments)
    useEffect(() => {
        if (isEmpty(assignments) || assignments.totalItems === 0) {
            setPageCount(1)
        } else {
            const mod = assignments.totalItems % rowsPerPage

            const div = Math.floor(assignments.totalItems / rowsPerPage)
            if (mod === 0) {
                setPageCount(div)
            } else {
                setPageCount(div + 1)
            }
        }



    }, [assignments])
    return (
        <div className='test-data__container'>

            <TableContainer component={Paper} sx={{ maxHeight: 450 }} className='scroll-custom'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader >
                    <TableHead>
                        <TableRow >
                            {columns && columns.length > 0 && columns.map(c => <TableCell key={c.id} className='header'
                                // align={['correctAnswer', 'grade', 'image', 'numberOfQuestion'].includes(c.id) ? 'center' : 'left'}
                                align="center"
                                style={{ minWidth: c.minWidth }}
                            >
                                {c.name}
                            </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {assignments && assignments.items && assignments.items.length > 0 ? assignments.items.map((row, index) => (
                            <TableRow
                                key={row.assignmentId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {columns.map(c => {
                                    return <TableCell key={c.id}
                                        // align={['correctAnswer', 'grade', 'image', 'numberOfQuestion'].includes(c.id) ? 'center' : 'left'}
                                        align="center"
                                    >
                                        {
                                            c.id === 'createdAt'
                                                ? getDateTimeFormat(row[c.id])
                                                : c.id === 'imageUrl'
                                                    ? <IconButton onClick={() => handleViewLightBox(row[c.id])}>
                                                        <ImageIcon />
                                                    </IconButton>
                                                    : c.id === 'correctAnswer'
                                                        ? Math.floor((row['grade'] / 10) * Object.keys(row['answer']).length)

                                                        : c.id === 'grade'
                                                            ? Number.parseFloat(row[c.id]).toFixed(2)
                                                            //     : c.id === 'numberOfQuestion'
                                                            //         ? Object.keys(row['answer']).length
                                                            : row[c.id]
                                        }</TableCell>
                                })}
                            </TableRow>
                        )) : <TableRow className="no-data">
                            <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                                <img src={noData} />

                            </TableCell>
                        </TableRow>
                        }
                    </TableBody>
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
            {isOpenLightBox &&

                <Lightbox
                    mainSrc={curUrl}

                    onCloseRequest={() => setIsOpenLightBox(false)}

                />
            }
        </div>
    );
}

export default AssignmentList;
