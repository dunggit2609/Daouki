import NotFound from "components/NotFound";
import SideBar from "components/SideBar";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router";
import CourseDetail from "./pages/CourseDetail";
import CreateCourse from "./pages/CreateCourse";
import CreateTest from "./pages/CreateTest"
import CreateSubmissionPage from "./pages/CreateSubmission"
import { _LIST_LINK } from "constant/config";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseSlice } from "core/redux/courseSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { UseSpinnerLoading } from "hooks/useSpinnerLoading";
import TestDetail from './pages/TestDetail/TestDetail';
import Assignments from './pages/Assignments/index';
import Visualize from './pages/Visualize/index';
import VisualizeCourse from './pages/VisualizeCourse/VisualizeCourse';


function Course(props) {
  const match = useRouteMatch();
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const { handleDisplaySpinner } = UseSpinnerLoading()
  const filter = {
    size: 50,
    page: 1
  }
  useEffect(async () => {
    const action = getAllCourseSlice(filter)
    try {
      handleDisplaySpinner(true)
      const rs = await dispatch(action)
      unwrapResult(rs)
      handleDisplaySpinner(false)
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
      handleDisplaySpinner(false)
    }

  }, [])
  const courses = useSelector(state => state.course.courses)
  const isGet = useSelector(state => state.course.isGet)
  useEffect(() => {

    if (location.pathname === _LIST_LINK.course && isGet && courses && courses.items && courses.items.length > 0) {
      history.push({ pathname: `${match.path}/${courses.items[0].courseId}` })
    } else if (location.pathname !== _LIST_LINK.addNewCourse && isGet && courses && courses.items && courses.items.length === 0) {
      history.push({ pathname: _LIST_LINK.noCourse })
    }
  }, [courses, isGet, location.pathname]);
  return (
    <div>
      <SideBar />
      <Switch>
        <Route
          path={`${match.path}/create-course/new`}
          component={CreateCourse}
          exact
        />
        <Route
          path={`${match.path}/:courseId`}
          component={CourseDetail}
          exact
        />
        <Route
          path={`${match.path}/:courseId/test/:testId`}
          component={TestDetail}
          exact
        />
        <Route
          path={`${_LIST_LINK.testCreate}`}
          component={CreateTest}
          exact
        />
        <Route
          path={`${_LIST_LINK.assginmentCreate}`}
          component={CreateSubmissionPage}
          exact
        />
        <Route
          path={`${_LIST_LINK.viewAssignment}`}
          component={Assignments}
          exact
        />
        <Route
          path={`${_LIST_LINK.visualize}`}
          component={Visualize}
          exact
        />
        <Route
          path={`${_LIST_LINK.visualizeCourse}`}
          component={VisualizeCourse}
          exact
        />
      </Switch>
    </div>
  );
}

export default Course;
