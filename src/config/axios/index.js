import axios from "axios";

const server = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-backend-rho-flame.vercel.app/api"
    : "http://localhost:3030/api"
);
export const baseUrl = server.replace(/\/api\/?$/, "");

const instance = axios.create({
  baseURL: server
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
  }
  return request;
});

instance.interceptors.response.use((response) => {
  if (response) {
    return response;
  }
}, function (error) {
  return Promise.reject(error);
});

export default instance;
