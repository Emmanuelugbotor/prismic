import axios from "axios";
import { baseURL } from "./routes";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

class APIClient {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = <T>() =>
    axiosInstance
      .get<T>(this.endpoint)
      .then((res) => res)
      .then((res) => res.data);

  post = <T>(data: T) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);

  delete = <T>(id: T) =>
    axiosInstance.delete<T>(this.endpoint + `/${id}`).then((res) => res.data);
  
  patch = <T, P>(id: T, data: P) =>
    axiosInstance.patch<T, P>(this.endpoint + `/${id}`, data).then((res) => res);
}

export default APIClient;
