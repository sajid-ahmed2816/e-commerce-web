import axios from "axios";

const url = "http://localhost:3030/api";

const instance = axios.create({
  baseURL: url,
});

const get = (endPoint) => {
  return instance.get(endPoint);
};

const getById = (endPoint, id) => {
  return instance.get(`${endPoint}/${id}`);
};

const post = (endPoint, body) => {
  return instance.post(endPoint, body);
};

const put = (endPoint, id, body) => {
  return instance.put(`${endPoint}/${id}`, body);
};

const del = (endPoint, id) => {
  return instance.delete(`${endPoint}/${id}`);
};

export { get, getById, post, put, del };
