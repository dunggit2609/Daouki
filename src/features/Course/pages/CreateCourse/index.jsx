import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Onboarding from 'features/Course/components/Onboarding';
import CreateCourseForm from 'features/Course/components/CreateCoureForm';
import './styles.scss'
import CreateTestForm from 'features/Course/components/CreateTestForm';
import CreateSubmission from 'features/Course/components/CreateSubmission';
CreateCourse.propTypes = {

};

function CreateCourse(props) {
    const [curStep, setCurStep] = useState(1)
    const handleNextStep = () => {
        setCurStep(curStep + 1)
    }
    return (

        <div className="create-course__container">
            <div className="onboarding">
                <Onboarding curStep={curStep} />
            </div>
            <section className="onboarding-create-new">
                {curStep === 1 && <> <CreateCourseForm handleNextStep={handleNextStep} /> </>}
                {curStep === 2 && <> <CreateTestForm handleNextStep={handleNextStep} /> </>}
                {curStep === 3 && <> <CreateSubmission /> </>}
            </section>
        </div>
    );
}

export default CreateCourse;