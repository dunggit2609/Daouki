import React from 'react';
import './styles.scss'
import { useTranslation } from 'react-i18next';
import { Button, Grid, Select, Slider } from '@mui/material';
import { useState } from 'react';
import { MenuItem } from '@material-ui/core';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BarChart from 'components/BarChart/index';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistic } from 'core/redux/testSlice';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PieChart from 'components/PieChart';
import { useHistory } from 'react-router';
import  ArrowBackIosIcon  from '@mui/icons-material/ArrowBackIos';
import { _LIST_LINK } from 'constant/config';

Visualize.propTypes = {

};

function Visualize(props) {
    const { t } = useTranslation()
    const [visualizeType, setVisualizeType] = useState(1)
    const [step, setStep] = useState(1)
    const [barData, setBarData] = useState([])
    const [barLabel, setBarLabel] = useState([])
    const [pieData, setPieData] = useState([])
    const pieLabel = ["Good score (8 - 10) - %", "Medium score (6.5 - 8) - %", "Rather score (5 - 6.5) - %", "Weak score (0 - 5) - %"]
    const visualizeTypes = [
        {
            label: t('visualize.grade_type'),
            value: 1,
            icon: <PieChartOutlineIcon />
        },
        {
            label: t('visualize.grade_range'),
            value: 2,
            icon: <BarChartIcon />
        },

    ]
    const { testId, courseId } = useParams()
    const dispatch = useDispatch()
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    useEffect(() => {
        fetchStatistic()
    }, [])
    const fetchStatistic = async () => {
        if (!testId) {
            return
        }

        const action = getStatistic({ testId, step })
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
    const statistic = useSelector(state => state.test.statistic)

    useEffect(() => {
        if (!statistic || !statistic.scoreInRange ||
            (!statistic.scoreAtGood && statistic.scoreAtGood !== 0) ||
            (!statistic.scoreAtMedium && statistic.scoreAtMedium !== 0) ||
            (!statistic.scoreAtRather && statistic.scoreAtRather !== 0) ||
            (!statistic.scoreAtWeak && statistic.scoreAtWeak !== 0)) {
            return
        }

        const barData = Object.values(statistic.scoreInRange).map(d => Number.parseInt(d) ? `${d}` : null)
        console.log(barData)
        const barLabel = Object.keys(statistic.scoreInRange).map(k => k.replace("_", " to "))
        const dummyPieData = [statistic.scoreAtGood, statistic.scoreAtMedium, statistic.scoreAtRather, statistic.scoreAtWeak]
        const totalPieData = dummyPieData.reduce((prev, cur) => {
            return prev + cur
        }, 0)
        const  pieData = dummyPieData.map(v => {
            const value = ((v / totalPieData) * 100).toFixed(2)
            return Number.parseInt(value) ? value : null
        })
        setBarData(barData)
        setBarLabel(barLabel)
        setPieData(pieData)
    }, [statistic])
    const marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
    ];

    function valuetext(value) {
        return `${value}`;
    }
    const handleClickBackToTest = () => {
        if (!courseId || !testId) {
            return
        }

        const url = _LIST_LINK.testDetail.replace(':courseId', courseId).replace(':testId', testId)
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
                    <Grid item xs={10} className='filter-item-container'>
                        <Grid container>
                            <Grid item xs={5} >
                                <div className='select-visualize-label'>Select type of visualizations</div>
                                <Select
                                    labelId="visualize-type-select-label"
                                    id="visualize-type-select"
                                    value={visualizeType}
                                    onChange={(e) => { setVisualizeType(e.target.value) }}
                                    className="select-visualize-type"
                                    size="small"
                                >
                                    {visualizeTypes.map(type => <MenuItem className='menu-item' key={type.value} value={type.value}>
                                        <span className="menu-icon">
                                            {type.icon}
                                        </span>
                                        <span className="menu-label">
                                            {type.label}
                                        </span>

                                    </MenuItem>)}
                                </Select>
                            </Grid>
                            {visualizeType === 2 &&
                                <Grid item xs={3} className='select-step-container'>
                                    <div className='select-visualize-label'>Select step of grade's range</div>

                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={1}
                                        getAriaValueText={valuetext}
                                        step={0.5}
                                        valueLabelDisplay="auto"
                                        marks={marks}
                                        max={5}
                                        value={step}
                                        onChange={(e) => setStep(e.target.value)}
                                    />
                                </Grid>}

                        </Grid>
                    </Grid>
                    {visualizeType === 2 &&
                        <Grid item xs={2} className='filter-item-container'>
                            <Button onClick={fetchStatistic} variant='contained' color="primary" startIcon={<InsertChartIcon />} fullWidth>{t('button.visualize')}</Button>
                        </Grid>}

                </Grid>

            </div>
            <div className="visualize__chart">
                {visualizeType === 1 ? <span className='pie-char__container'>
                    <h2>
                        Statistical chart of grades by graded type
                    </h2>
                </span>
                    : <h2>
                        Statistical chart of grades by grade's range
                    </h2>
                }

                {visualizeType === 1 ? <span className='pie-char__container'>
                    <PieChart data={pieData} label={pieLabel} />
                </span>
                    : <BarChart data={barData} label={barLabel} />
                }
            </div>
        </div>
    );
}

export default Visualize;