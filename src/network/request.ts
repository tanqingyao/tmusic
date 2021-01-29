import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/* QQ音乐API */
export function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: "http://localhost:3300/"
  });
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === 200) {
        return response;
      } else {
        return Promise.resolve(response);
      }
    },
    err => {
      return Promise.reject(err);
    }
  );
  return instance(config);
}

/* 网易云API */
export function getNeteaseRequest(config: AxiosRequestConfig) {
  const request = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
  });

  request.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === 200) {
        return response;
      } else {
        return Promise.resolve(response);
      }
    },
    err => {
      return Promise.reject(err);
    }
  );
  return request(config);
}
