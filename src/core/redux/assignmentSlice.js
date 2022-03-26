import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assignmentApi from "core/API/assignmentApi";
import { convertObjectSnakeToCamel } from "core/utils/object";

const filter = { size: 50, page: 1 }
export const createAssignment = createAsyncThunk(
  "assignment/create",
  async (payload) => {
    
    const rs = await assignmentApi.create(payload);
    if (!rs || !rs.success) {
      return
    }
    
    return convertObjectSnakeToCamel(rs.data);
  }
);
export const getAllAssignment = createAsyncThunk(
  "assignment/getAll",
  async (payload) => {
    const rs = await assignmentApi.getAll(payload);
    if (!rs || !rs.success) {
      return
    }
    const data = rs.data.items.map(v => convertObjectSnakeToCamel(v))
    const rsData = {
      currentPage: rs.data.current_page,
      totalItems: rs.data.total_items,
      items: data
    }
    return rsData
  }
);
export const getAssignmentDetail = createAsyncThunk(
  "assignment/getDetail",
  async (payload) => {
    const { id, data } = payload
    const rs = await assignmentApi.getDetail(id, data);
    if (!rs || !rs.success) {
      return
    }
    return convertObjectSnakeToCamel(rs.data)
  }
);
export const deleteAssignment = createAsyncThunk(
  "assignment/delete",
  async (id) => {
    
    const rs = await assignmentApi.delete(id);
    if (!rs || !rs.success) {
      return
    }
    getAllAssignment(filter)
  }
);
export const updateAssignment = createAsyncThunk(
  "assignment/update",
  async (payload) => {
    

    const { id, data } = payload

    const rs = await assignmentApi.update(id, data);
    if (!rs || !rs.success) {
      return
    }
    getAllAssignment(filter)
  }
);

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    assignments: [],
    curAssignment: {},
  },
  reducers: {},
  extraReducers: {
    [createAssignment.fulfilled]: (state, action) => {
      state.curAssignment = action.payload;
    },
    [getAllAssignment.fulfilled]: (state, action) => {
      state.assignments = action.payload;
    },
    [getAssignmentDetail.fulfilled]: (state, action) => {
      state.curAssignment = action.payload;
    },
  },
});

const { reducer } = assignmentSlice;
export default reducer;
