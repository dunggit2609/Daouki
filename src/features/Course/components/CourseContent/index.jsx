import React from 'react';


import CourseContentHandler from '../CourseContenHandler';
import CourseContentMain from '../CourseContentMain';
CourseContent.propTypes = {

};

function CourseContent(props) {

    return (
        <div className="course-content-container">
            <section className="courses-content__handler">
                <CourseContentHandler></CourseContentHandler>
            </section>
            <section className="course-content__main">
                <CourseContentMain />
            </section>
        </div>
    );
}

export default CourseContent;