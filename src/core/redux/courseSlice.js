import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import courseApi from "core/API/courseApi";
import { convertObjectSnakeToCamel } from "core/utils/object";

const filter = { size: 50, page: 1 }
export const createCourseSlice = createAsyncThunk(
  "course/create",
  async (payload, {dispatch}) => {
    

    const rs = await courseApi.create(payload);
    if (!rs || !rs.success) {
      return
    }
    dispatch(getAllCourseSlice(filter))
    return convertObjectSnakeToCamel(rs.data);
  }
);
export const getAllCourseSlice = createAsyncThunk(
  "course/getAll",
  async (payload) => {
    const rs = await courseApi.getAll(payload);
    if (!rs || !rs.success || !rs.data.items) {
      return {
        currentPage: null,
        totalItems: null,
        items: []
      }
    }
    const data = rs.data.items.map(v => convertObjectSnakeToCamel(v))
    const rsData = {
      currentPage: rs.data.current_page,
      totalItems: rs.data.total_items,
      items: data || []
    }
    return rsData
  }
);
export const getDetailSlice = createAsyncThunk(
  "course/getDetail",
  async (payload) => {
    
    const rs = await courseApi.getDetail(payload);
    if (!rs || !rs.success) {
      return
    }
    return convertObjectSnakeToCamel(rs.data)
  }
);
export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id) => {
    
    const rs = await courseApi.delete(id);
    if (!rs || !rs.success) {
      return
    }
    getAllCourseSlice(filter)
  }
);
export const updateCourse = createAsyncThunk(
  "course/update",
  async (payload) => {
    

    const { id, data } = payload

    const rs = await courseApi.update(id, data);
    if (!rs || !rs.success) {
      return
    }
    getAllCourseSlice(filter)
  }
);
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: {},
    curCourse: {},
    isGet: false
  },
  reducers: {},
  extraReducers: {
    [createCourseSlice.fulfilled]: (state, action) => {
      state.curCourse = action.payload
    },
    [getAllCourseSlice.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.isGet = true
    },
    [getDetailSlice.fulfilled]: (state, action) => {
      state.curCourse = action.payload;
    },
  },
});

const { reducer } = courseSlice;
export default reducer;
