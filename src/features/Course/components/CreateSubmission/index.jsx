import React, { useState } from 'react';
import { Dialog, InputLabel, MenuItem, Select } from '@material-ui/core';
import './styles.scss'
import DropzoneUpload from 'components/DropzoneUpload';
import { useTranslation } from 'react-i18next';
import { Button, Chip, DialogActions, DialogContent, DialogTitle, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { _LIST_LINK } from 'constant/config';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAssignment } from 'core/redux/assignmentSlice';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRouteMatch, useHistory } from 'react-router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { cloneDeep } from 'core/utils/common';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import doneImage from 'assets/images/check-icon.jpeg'

function CreateSubmission(props) {
    const dropzoneConfig = {
        filesLimit: 1000,
        showPreviews: false,
        showPreviewsInDropzone: false,
        showFileNamesInPreview: false,
        previewText: "",
        useChipsForPreview: true,
        acceptedFiles: ['image/*'],
        showAlerts: false
    }
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [isValid, setIsValid] = useState(false)
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();
    const [openDialog, setOpenDialog] = useState(false)
    const history = useHistory()
    const { courseId, testId } = useParams()
    const match = useRouteMatch()

    const handleChangeFile = (values) => {

        const dummy = values.map(v => { return { url: v.url, name: v.name } })
        console.log(dummy)
        setData(dummy)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const currentTest = useSelector(state => state.test.curTest)
    const currentCourse = useSelector(state => state.course.curCourse)
    const handleConfirmAssignSucces = () => {

        if ((!courseId) && (!currentCourse || !currentCourse.courseId)) {
            return
        }
        const url = `${_LIST_LINK.courseDetail}`
            .replace(':courseId', courseId ? courseId : currentCourse.courseId)
        history.push({ pathname: url })
    }
    const handleSubmitAssignment = async () => {
        if (data.length === 0 || (!testId && !currentTest.testId)) {
            setIsValid(true)
            return
        }
        setIsValid(false)
        const payload = { test_id: testId ? testId : currentTest.testId, url: data.map(d => d.url) }
        const action = createAssignment(payload)
        try {
            handleDisplaySpinner(true)
            const rs = await dispatch(action)
            handleDisplaySpinner(false)
            unwrapResult(rs)
            setOpenDialog(true)
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }
    }
    const handleClickBackToTest = () => {
        if (!courseId || !testId) {
            return
        }

        const url = _LIST_LINK.testDetail.replace(':courseId', courseId).replace(':testId', testId)
        history.push({ pathname: url })

    }

    const handleDeleteFile = (index) => {
        const dummy = cloneDeep(data)

        dummy.splice(index, 1)
        setData(dummy)
    }

    const handleClickFile = (url) => {
        window.open(url, '_blank')
    }

    return (
        <div className='assignment-container'>
            <div className="upload-submission-image">
                <div className="upload-submission-label">
                    {match.path === _LIST_LINK.assginmentCreate && <span className="back-to-test" onClick={handleClickBackToTest}><ArrowBackIosIcon /></span>
                    }

                    {t("create_submission.upload_assignment")}
                </div>

                <Grid container spacing={4} className='list-assignment-file-container'>
                    <Grid item xs={8}>
                        <DropzoneUpload config={dropzoneConfig} onChange={handleChangeFile} fileType="image" />
                    </Grid>
                    <Grid item xs={4}>
                        <Paper style={{
                            height: 500 + 'px', paddingTop: 24 + 'px',
                            paddingRight: 24 + 'px',
                            paddingLeft: 24 + 'px',
                            marginTop: 18 + 'px', marginBottom: -16 + 'px',
                            // overflowY: 'hidden'
                        }}>
                            <div className='list-file-title'> <span className='mr-8 d-flex align-items-center'> <FilterListIcon /> </span> List files</div>
                            {
                                data &&
                                    data.length > 0 ?

                                    <ul className='file-list-container scroll-custom'>
                                        {data.map((d, index) =>
                                            <li key={d.url} className='file-item'>
                                                <Chip label={d.name} onDelete={() => handleDeleteFile(index)}
                                                    onClick={() => handleClickFile(d.url)}
                                                    icon={<AttachFileIcon />}
                                                    fullWidth
                                                >

                                                    {/* <a href={d.url} className='decoration-none' target='_blank'>


                                                    </a> */}
                                                </Chip>

                                            </li>)}
                                    </ul>
                                    :
                                    <div className='empty-list'>
                                        <PlaylistRemoveIcon />
                                        Empty list</div>

                            }
                        </Paper>
                    </Grid>
                </Grid>

                {isValid && <p className="err-msg">{t('yupValidate.required_field')}</p>}
            </div>
            <div className="result-assign">
                <Dialog onClose={handleCloseDialog} open={openDialog} disableBackdropClick={true}
                    disableEscapeKeyDown={true}>
                    <DialogTitle className="dialog-title d-flex justify-content-center"><b>Grade assigments successfully!!!</b> </DialogTitle>
                    <DialogContent>
                        <div className='d-flex justify-content-center'>
                            <img src={doneImage} width={150 + 'px'} height={150 + 'px'}/>

                        </div>
                        <br />
                        <div className='d-flex justify-content-center'>
                            Progress will take a few minutes and details will be sent to your email.

                        </div>

                       
                        <br />
                        <div className='d-flex justify-content-center'>
                            After confirming,  you will be redirected to course detail
                        </div>
                    </DialogContent>
                    <DialogActions>

                        <Button
                            color='primary'
                            variant="contained"
                            onClick={handleConfirmAssignSucces}
                        >
                            {t("button.confirm")}
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
            <div className="submit-assignment">
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="default"
                    onClick={handleSubmitAssignment}
                >
                    {t("button.assign")}
                </Button>
            </div>
            <section className="do-later">
                <Link to={_LIST_LINK.course} className='decoration-none'>
                    <Button
                        color="primary"
                        variant="text"
                        fullWidth
                        type="default"
                    >
                        {t("button.do_later")}
                    </Button>
                </Link>

            </section>

        </div >
    );
}

export default CreateSubmission;