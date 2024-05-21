import { ACCESS_TOKEN } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const axiosHandlerNoBearer = axios.create({
  baseURL: "http://localhost:8088",
});

export const axiosHandler = axios.create({
  baseURL: "http://localhost:8088",
});

axiosHandler.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie(ACCESS_TOKEN);

    if (accessToken) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
    }

    if (config.data instanceof FormData) {
      Object.assign(config.headers, { "Content-Type": "multipart/form-data" });
    }

    return config;
  },
  (response: AxiosError) => Promise.reject(response),
);
