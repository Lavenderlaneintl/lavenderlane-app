import axios from "axios";
import { UserStateType } from "../store/userStore";
import { storage } from "./appStorage";
import STORE_KEYS from "../constants/storeKeys";

const BASE_URL = "https://lavenderlaneint.onrender.com";

const data = storage.getString(STORE_KEYS.userData);
const authData: UserStateType = data ? JSON.parse(data) : undefined;

const token = authData?.authData?.token;

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
      config.headers.Authorization = `Bearer ${token}`;
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