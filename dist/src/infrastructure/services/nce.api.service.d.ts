import { AxiosInstance, AxiosResponse } from 'axios';
export declare class NceApiService {
    axiosInstance: AxiosInstance;
    constructor(baseURL: string, token?: string);
    post(url: any, body: any): Promise<any>;
    put(url: any, body: any): Promise<any>;
    get(url: any): Promise<AxiosResponse<any, any>>;
}
