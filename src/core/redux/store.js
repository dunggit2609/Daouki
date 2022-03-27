import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import spinnerReducer from "./spinnerSlice"
const rootReducer = {
    auth: authReducer,
    spinner: spinnerReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;