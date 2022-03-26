import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testApi from "core/API/testApi";
import { convertObjectSnakeToCamel } from "core/utils/object";

const filter = { size: 50, page: 1 }
export const createTest = createAsyncThunk(
  "test/create",
  async (payload, {dispatch}) => {
    
    const rs = await testApi.create(payload.payload, payload.courseID);
    if (!rs || !rs.success) {
      return
    }
    
    return convertObjectSnakeToCamel(rs.data);
  }
);
export const getAllTest = createAsyncThunk(
  "test/getAll",
  async (payload) => {
    const rs = await testApi.getAll(payload.courseId, payload.filter);
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
export const getTestDetail = createAsyncThunk(
  "test/getDetail",
  async (payload) => {
    
    const rs = await testApi.getDetail(payload);
    if (!rs || !rs.success) {
      return
    }
    return convertObjectSnakeToCamel(rs.data)
  }
);
export const deleteTest = createAsyncThunk(
  "test/delete",
  async (id) => {
    
    const rs = await testApi.delete(id);
    if (!rs || !rs.success) {
      return
    }
    getAllTest(filter)
  }
);
export const updateTest = createAsyncThunk(
  "test/update",
  async (payload) => {
    

    const { id, data } = payload

    const rs = await testApi.update(id, data);
    if (!rs || !rs.success) {
      return
    }
    getAllTest(filter)
  }
);
export const getStatistic = createAsyncThunk(
  "test/getStatistic",
  async (payload) => {
    

    const { step, testId } = payload

    const rs = await testApi.getStatistic(testId, step);
    if (!rs || !rs.success) {
      return
    }
    return convertObjectSnakeToCamel(rs.data)
  }
);
export const getAllStatistics = createAsyncThunk(
  "test/getAllStatistics",
  async (payload) => {
    


    const rs = await testApi.getAllStatistic(payload);
    if (!rs || !rs.success) {
      return
    }
    return rs.data.map(item => convertObjectSnakeToCamel(item))
  }
);
const testSlice = createSlice({
  name: "test",
  initialState: {
    tests: {},
    curTest: {},
    statistic: {},
    statistics: []  
  },
  reducers: {},
  extraReducers: {
    [createTest.fulfilled]: (state, action) => {
      state.curTest = action.payload;
    },
    [getAllTest.fulfilled]: (state, action) => {
      state.tests = action.payload;
    },
    [getTestDetail.fulfilled]: (state, action) => {
      state.curTest = action.payload;
    },
    [getStatistic.fulfilled]: (state, action) => {
      state.statistic = action.payload;
    },
    [getAllStatistics.fulfilled]: (state, action) => {
      state.statistics = action.payload;
    },
  },
});

const { reducer } = testSlice;
export default reducer;
