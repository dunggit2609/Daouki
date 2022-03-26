import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import { useSelector } from 'react-redux';
import { isEmpty } from 'core/utils/object';
import { DialogActions, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Table, TableHead, TableRow, Tooltip, TableCell, TableBody } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RESULT_TYPE_FILE, RESULT_TYPE_IMAGE, RESULT_TYPE_INPUT } from 'features/Course/constant/resultType';
import { PAPER_TYPE_1, PAPER_TYPE_2 } from 'features/Course/constant/paperType';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Lightbox from 'react-image-lightbox';

TestDetailForm.propTypes = {

};
const columns = [
    {
        name: 'NO.',
        id: 'no'
    },
    {
        name: 'A',
        id: 'A'
    },
    {
        name: 'B',
        id: 'B'
    },
    {
        name: 'C',
        id: 'C'
    },

    {
        name: 'D',
        id: 'D'
    },
]
function TestDetailForm(props) {
    const [testName, setTestName] = useState('')
    const [resultType, setResultType] = useState('')
    const [multiple, setMultiple] = useState('')
    const [paperType, setPaperType] = useState('')
    const [numberOfQuestion, setNumberOfQuestion] = useState(0)
    const [openDialog, setOpenDialog] = useState(false)
    const [currentAnswer, setCurrentAnswer] = useState([])
    const [tests, setTests] = useState([])
    const [isOpenLightBox, setIsOpenLightBox] = useState(false)
    const [curUrl, setCurUrl] = useState('')
    const { t } = useTranslation()
    const curTest = useSelector(state => state.test.curTest)

    const getResultType = (type) => {
        switch (type) {
            case RESULT_TYPE_IMAGE:
                return t('resultType.image')
            case RESULT_TYPE_FILE:
                return t('resultType.file')
            case RESULT_TYPE_INPUT:
                return t('resultType.input')
            default:
                break

        }
    }

    const getPaperModel = (model) => {
        switch (model) {
            case PAPER_TYPE_1:
                return t('paper_type.model_1')
            case PAPER_TYPE_2:
                return t('paper_type.model_2')
            default:
                break
        }
    }

    const handleOpenResultPopup = (index) => {
        if (!tests[index]) {
            return
        }
        setOpenDialog(true)
        const dummy = Object.values(tests[index].test_answer).map(d => Array.isArray(d) ? d : [d])
        const answer = dummy.map(d => {

            const result = {}
            d.forEach(data => {
                switch (data) {
                    case 'A':
                        result['A'] = true
                        break
                    case 'B':
                        result['B'] = true
                        break
                    case 'C':
                        result['C'] = true
                        break
                    case 'D':
                        result['D'] = true
                        break
                    default:
                        break
                }
            })

            return result
        })

        setCurrentAnswer(answer)
    }

    const handleCloseResultPopup = () => {
        setOpenDialog(false)
        setCurrentAnswer({})
    }

    const handleViewLightBox = (url) => {
        setIsOpenLightBox(true)
        setCurUrl(url)
    }

    useEffect(() => {
        if (isEmpty(curTest) || !curTest.testConfig) {
            return
        }

        setTestName(curTest.testName)
        setResultType(getResultType(curTest.testConfig.test_answer_type))
        setPaperType(getPaperModel(curTest.testConfig.paper_type))
        setMultiple(curTest.testConfig.is_multiple_choice)
        setNumberOfQuestion(curTest.testConfig.total_number_of_question)
        setTests(curTest.testCodes)
    }, [curTest])
    return (
        <div className='test-detail-form'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3>{t("test_detail.info")}</h3>    <br />
                    <TextField variant="outlined" disabled fullWidth label={t('create_test.test_name')} value={testName} onChange={(e) => setTestName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Divider></Divider>

                </Grid>

                <Grid item xs={12}>
                    <h3>{t("test_detail.config")}</h3> <br />

                    <Grid container spacing={4}>
                        <Grid item xs={5}>
                            <TextField variant="outlined" fullWidth label={t('create_test.result_type')} value={resultType} disabled={true} />
                        </Grid>
                        <Grid item xs={2} className='multiple-choice-detail'>
                            <span className='multiple-choice__label'>{t('create_test.multiple_choice')}</span>
                            <span>
                                {multiple ? <CheckOutlinedIcon /> : <CloseIcon />}

                            </span>
                            {/* <TextField variant="outlined" label={t('create_test.multiple_choice')} fullWidth label={t('create_test.multiple_choice')} value={multiple ? 'True' : 'False'} disabled={true} /> */}
                        </Grid>
                        <Grid item xs={5}>
                            <TextField variant="outlined" fullWidth label={t('create_test.paper_type')} value={paperType} disabled={true} />

                        </Grid>
                        <Grid item xs={5}>
                            <TextField variant="outlined" fullWidth label={t('create_test.amount_of_question')} value={numberOfQuestion} disabled={true} />

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider></Divider>

                </Grid>

                <Grid item xs={12} className="mt-24 test-codes">
                    {tests && tests.length > 0 && tests.map((test, index) =>
                        <Grid container key={test.test_code} spacing={4} style={{ marginBottom: 16 + 'px' }}>
                            <Grid item xs={10} className='test-code'>
                                <TextField variant="outlined" fullWidth label={t('create_test.test_code')}
                                    value={test.test_code} disabled={true} />
                            </Grid>
                            <Grid item xs={2} className='view-test-result'>
                                {test.image_url && curTest.testConfig.test_answer_type === RESULT_TYPE_IMAGE ?
                                    <Tooltip title="View result file" onClick={() => handleViewLightBox(test.image_url)}>
                                        <IconButton>
                                            <AttachFileIcon />
                                        </IconButton>

                                    </Tooltip>
                                    : test.image_url && curTest.testConfig.test_answer_type === RESULT_TYPE_FILE ?
                                        <a href={test.image_url} target='_blank' className="decoration-none">
                                            <Tooltip title="View result file" >
                                                <IconButton>
                                                    <AttachFileIcon />
                                                </IconButton>

                                            </Tooltip>
                                        </a>
                                        : <Tooltip title="View result file">
                                            <IconButton onClick={() => handleOpenResultPopup(index)}>
                                                <VisibilityIcon />

                                            </IconButton>

                                        </Tooltip>
                                }
                            </Grid>

                        </Grid>

                    )}

                </Grid>


            </Grid>
            <Dialog open={openDialog} disableBackdropClick={true}
                disableEscapeKeyDown={true}>
                <DialogTitle className="dialog-title"><h3>Test result</h3></DialogTitle>
                <DialogContent>
                    <Table sx={{ minWidth: 550 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow >
                                {columns && columns.length > 0 && columns.map(c => <TableCell key={c.id} align='center'
                                    className='header'
                                    style={{ width: 30 + 'px' }}

                                >
                                    {c.name}
                                </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {currentAnswer && currentAnswer.length > 0 ? currentAnswer.map((row, index) => (
                                <TableRow
                                    key={row.testId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className='body-row'
                                >
                                    {columns.map(c => {
                                        return <TableCell key={c.id}
                                            align='center'

                                            style={{ width: 30 + 'px' }}

                                        >
                                            {c.id === 'no' ? <span><b>{index + 1}</b></span>
                                                : !multiple ? (
                                                    row[c.id]
                                                        ? <RadioButtonCheckedIcon color='primary' />
                                                        : <RadioButtonUncheckedIcon />
                                                ) : (
                                                    row[c.id]
                                                        ? <CheckBoxIcon color='primary' />
                                                        : <CheckBoxOutlineBlankIcon />
                                                )

                                            }
                                        </TableCell>
                                    })}
                                </TableRow>
                            )) : <TableRow className='no-data'><TableCell >No data</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>

                    <Button
                        color='primary'
                        variant="contained"
                        onClick={handleCloseResultPopup}
                    >
                        {t("button.ok")}
                    </Button>

                </DialogActions>
            </Dialog>
            {isOpenLightBox &&

                <Lightbox
                    mainSrc={curUrl}

                    onCloseRequest={() => setIsOpenLightBox(false)}

                />
            }
        </div>
    );
}

export default TestDetailForm;