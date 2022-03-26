import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import InputField from 'components/FormControl/InputField';
import './styles.scss'
import { Button } from '@mui/material';
import { useSnackbar } from "notistack";
import { createCourseSlice } from 'core/redux/courseSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { Link } from 'react-router-dom';
import { _LIST_LINK } from 'constant/config';

CreateCourseForm.propTypes = {

};

function CreateCourseForm(props) {
    const { handleNextStep } = props
    const { enqueueSnackbar } = useSnackbar();

    const { t } = useTranslation()
    const dispatch = useDispatch();
    const { handleDisplaySpinner } = UseSpinnerLoading()


    const schema = yup.object().shape({
        courseName: yup
            .string()
            .required(t("yupValidate.required_field")),
        //  generate handle
        courseCode: yup
            .string()
            .required(t("yupValidate.required_field"))

    });
    const form = useForm({
        defaultValues: {
            courseName: "",
            courseCode: "",
        },
        resolver: yupResolver(schema),
    });

    // const { isSubmitting } = form.formState;
    const handleOnSubmit = async (values) => {
        try {
            handleDisplaySpinner(true)
            const action = createCourseSlice(values)
            const rs = await dispatch(action)
            handleDisplaySpinner(false)
            unwrapResult(rs)

            handleNextStep()
            form.reset();
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }

    };
    return (


        <div className="create-course__body">
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                <section className="course-info__form">
                    <div className="course-code">
                        <InputField
                            name="courseCode"
                            label={t("create_course.course_code")}
                            form={form}
                            disabled={false}
                        />
                    </div>
                    <div className="course-name">
                        <InputField
                            name="courseName"
                            label={t("create_course.course_name")}
                            form={form}
                            disabled={false}
                        />
                    </div>

                </section>
                <section className="course-info__submit">
                    <Button
                        color="primary"
                        className="mainBox__submitButton"
                        variant="contained"
                        fullWidth
                        type="submit"

                    >
                        {t("button.next_step")}
                    </Button>
                </section>
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
            </form>


        </div>
    );
}

export default CreateCourseForm;