import React from 'react';
import './styles.scss'
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatistics } from 'core/redux/testSlice';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { StackedBarChart } from 'components/StackedBarChart/StackedBarChart';
import { useHistory } from 'react-router';
import { _LIST_LINK } from 'constant/config';
import  ArrowBackIosIcon  from '@mui/icons-material/ArrowBackIos';


function VisualizeCourse(props) {
    // const { t } = useTranslation()

    const [stackData, setStackData] = useState([])
    const [dataSetLabel, setDataSetLabel] = useState([])
    const [stackLabel, setStackLabel] = useState([])

    const { courseId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();
    const datasetLabel = ["Good score (8 - 10)", "Medium score (6.5 - 8)", "Rather score (5 - 6.5)", "Weak score (0 - 5)"]
    useEffect(() => {
        fetchStatistic()
    }, [])
    const fetchStatistic = async () => {
        if (!courseId) {
            return
        }
        const action = getAllStatistics(courseId)
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
    const statistic = useSelector(state => state.test.statistics)

    useEffect(() => {

        const goodScore = [];
        const mediumScore = [];
        const ratherScore = [];
        const weakScore = [];
        statistic.forEach(s => {
            goodScore.push(s.scoreAtGood)
            mediumScore.push(s.scoreAtMedium)
            ratherScore.push(s.scoreAtRather)
            weakScore.push(s.scoreAtWeak)
        })
        const dummyLabel = statistic.map(s => {
            return s.testName
        })


        setStackData([goodScore, mediumScore, ratherScore, weakScore])
        setStackLabel(dummyLabel)
        setDataSetLabel(datasetLabel)
    }, [statistic])

    const handleClickBackToTest = () => {
        if (!courseId ) {
            return
        }

        const url = _LIST_LINK.courseDetail.replace(':courseId', courseId)
        history.push({ pathname: url })

    }

    return (
        <div className='visualize__container'>
            <div className="visualize__filter">
                <Grid container className='filter__container'>
                    <Grid item xs={12} className='visualize-title'>
                        <span className="back-to-test" onClick={handleClickBackToTest}><ArrowBackIosIcon /></span>
                        <h2>Visualization</h2>
                    </Grid>

                </Grid>

            </div>
            <div className="visualize__chart">
                <h2>
                    Statistical chart of grades by graded type
                </h2>

                <StackedBarChart data={stackData} labels={stackLabel} datasetLabel={dataSetLabel} />
            </div>
        </div>
    );
}

export default VisualizeCourse;