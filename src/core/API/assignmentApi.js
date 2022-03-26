import axiosClient from "./axiosClient";
import {convertObjectCamelToSnake} from 'core/utils/object'
const url = "/test";
const assignmentApi = {
  create(data) {
    return axiosClient.post(`${url}/grade`, convertObjectCamelToSnake(data));
  },
  getAll(data) {
    return axiosClient.post(`/assignment?size=${data.size}&page=${data.page}&student_id=${data.student_id}&start_date=${data.start_date}&end_date=${data.end_date}&start_grade=${0}&end_grade=${10}`, data.filter);
  },
  getDetail(id) {
    return axiosClient.get(`${url}/get-test/${id}`);
  },
};

export default assignmentApi;
