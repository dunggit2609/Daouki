import axiosClient from "./axiosClient";
import { convertObjectCamelToSnake } from 'core/utils/object'
import qs from 'query-string'
const url = "/test";
const testApi = {
  create(data, courseID) {
    return axiosClient.post(`${url}/create/${courseID}`, convertObjectCamelToSnake(data));
  },
  getAll(courseID, payload) {
    return axiosClient.get(`${url}/get-all-test/${courseID}?size=${payload.size}&page=${payload.page}&status=${payload.status}&name=${payload.name}&start_date=${payload.start_date}&end_date=${payload.end_date}`);
  },
  getDetail(id) {
    return axiosClient.get(`${url}/get-test/${id}`);
  },
  delete(id) {
    return axiosClient.delete(`${url}/${id}`)
  },
  update(id, payload) {
    return axiosClient.put(`${url}/${id}`, convertObjectCamelToSnake(payload))
  },
  getStatistic(id, payload) {
    return axiosClient.get(`${url}/get-test-statistic/${id}?step=${payload ? payload : 1}`)
  },
  getAllStatistic(id) {
    return axiosClient.get(`${url}/get-all-test-statistics/${id}`)

  },
  exportAssignments(payload) {
    return axiosClient.post(`${url}/export-test`, payload)
  }

};

export default testApi;
