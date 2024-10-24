import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import * as https from 'https';
import { HttpException } from '@nestjs/common';

export class NceApiService {
  axiosInstance: AxiosInstance;
  constructor(baseURL: string, token = '') {
    const headers =
      token === ''
        ? {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
          }
        : {
            'X-AUTH-TOKEN': token,
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
          };
    this.axiosInstance = axios.create({
      baseURL,
      headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    this.axiosInstance.interceptors.response.use(onResponse, onResponseError);
  }

  async post(url, body) {
    const data = await this.axiosInstance.post(url, body);
    return data === undefined ? { data: [] } : data.data;
  }

  async put(url, body) {
    const { data } = await this.axiosInstance.put(url, body);
    return data;
  }

  async get(url) {
    return this.axiosInstance.get(url);
  }
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError) => {
  //   console.error(`[response error] [${JSON.stringify(error)}]`);
  if (error.response?.status == 400) {
    throw new HttpException('Session full', HttpStatusCode.Conflict);
  }
};
