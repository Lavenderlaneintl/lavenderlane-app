import axios from "axios";
import { useUserStore } from "../store/userStore";

const BASE_URL = "https://lavenderlaneint.onrender.com";

const { authData } = useUserStore();
const token = authData?.token;

console.log("token", token);

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
    if (token) {
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyY2M4Njk0LTk0MTUtNDEzMS1hMmYwLWMyMmI0YTZlZjNiMCIsImlhdCI6MTc0MDEzMjYwMiwiZXhwIjoxNzQwMjE5MDAyfQ.4gqmWwAIOTBMXv9tJEQTmCxv-36tW8jH2xMRygIM7As`;
    }

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