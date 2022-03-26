import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import spinnerReducer from "./spinnerSlice"
import courseReducer from "./courseSlice"
import testReducer from "./testSlice"
import assigmentReducer from "./assignmentSlice"
const rootReducer = {
    auth: authReducer,
    spinner: spinnerReducer,
    course: courseReducer,
    test: testReducer,
    assignment: assigmentReducer
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;