import axios from "axios";
import { getApiBaseUrl, getPrinterApiBaseUrl } from "./configStorage";

export const axiosClient = axios.create({
  baseURL: getApiBaseUrl(),
});

export const printerAxiosClient = axios.create({
  baseURL: getPrinterApiBaseUrl(),
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

printerAxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// if there is a error in response redirect to login page
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

printerAxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
