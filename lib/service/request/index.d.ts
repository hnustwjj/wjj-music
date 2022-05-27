import { AxiosInstance } from 'axios';
import { wjjRequestConfig, interceptor } from '@/service/request/type';
export declare class wjjRequest {
    instance: AxiosInstance;
    interceptor?: interceptor;
    constructor(config: wjjRequestConfig);
    request<T = any>(config: wjjRequestConfig): Promise<T>;
    get<T = any>(config: wjjRequestConfig): Promise<T>;
    post<T = any>(config: wjjRequestConfig): Promise<T>;
    delete<T = any>(config: wjjRequestConfig): Promise<T>;
    put<T = any>(config: wjjRequestConfig): Promise<T>;
}
