import axiosClient from "./axiosClient";
import {convertObjectCamelToSnake} from 'core/utils/object'
const url = "/course";
const courseApi = {
  create(data) {
    return axiosClient.post(url, convertObjectCamelToSnake(data));
  },
  getAll(data) {
    return axiosClient.get(`${url}?size=${data.size}&page=${data.page}&name=${data.name ? data.name : ''}`);
  },
  getDetail(id) {
    return axiosClient.get(`${url}/id/${id}`);
  },
  delete(id) {
      return axiosClient.delete(`${url}/${id}`)
  },
  update(id, payload) {
      return axiosClient.put(`${url}/${id}`, convertObjectCamelToSnake(payload))
  }
};

export default courseApi;
