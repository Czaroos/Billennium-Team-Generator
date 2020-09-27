import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { __API_URL__ } from '../consts';

interface Instance extends AxiosInstance {
  get: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
  delete: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
  post: <R = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<R>;
  put: <R = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<R>;
}

const makeInstance = (config: AxiosRequestConfig): Instance => {
  return Axios.create(config) as Instance;
};

export const api = makeInstance({
  baseURL: __API_URL__,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});
