import axios from "axios";
import { getLocalData } from "./localStorage";

const BASE_URL = "https://lavenderlaneint.onrender.com";

const token = getLocalData("userToken");

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// token interceptor
apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyY2M4Njk0LTk0MTUtNDEzMS1hMmYwLWMyMmI0YTZlZjNiMCIsImlhdCI6MTczOTkyMzgyMCwiZXhwIjoxNzQwMDEwMjIwfQ.Y4OpLowJ4SSxpWqc6uNTDSRvNTXydNlBbt46bmMQCAU`;
    // if (token) {
    //   config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyY2M4Njk0LTk0MTUtNDEzMS1hMmYwLWMyMmI0YTZlZjNiMCIsImlhdCI6MTczOTQ5MTQ4NiwiZXhwIjoxNzM5NTc3ODg2fQ.5Deo0__HIYfyvtcnaVP4M9p0yWzq0IDfyhRV4wT-igE0`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// invalid token interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    if (error.response?.status === 401) {
      //   window.location.href = "/login";
    }
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({
        message: "No response received from the server. Please try again.",
      });
    } else {
      return Promise.reject({
        message: "An unexpected error occurred. Please try again.",
      });
    }
  }
);

export default apiClient;
