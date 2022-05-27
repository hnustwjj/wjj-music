import axios from 'axios'
import { AxiosInstance } from 'axios'
import { wjjRequestConfig, interceptor } from '@/service/request/type'
export class wjjRequest {
  //保存axios实例
  instance: AxiosInstance
  //保存属于每个axios实例特有的拦截器函数
  interceptor?: interceptor

  constructor(config: wjjRequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptor

    //从config中取出的，实例特有的拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestOnFulfilled,
      this.interceptor?.requestOnRejected
    )

    this.instance.interceptors.response.use(
      this.interceptor?.responseOnFulfilled,
      this.interceptor?.responseOnRejected
    )
  }

  //传入泛型，用户可以指定返回的Promise的值的类型
  request<T = any>(config: wjjRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      //request指定第二个泛型为传入的泛型，可以指定request返回的Promise的值的类型
      this.instance.request<any, T>(config).then(resolve, reject)
    })
  }

  get<T = any>(config: wjjRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: wjjRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: wjjRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T = any>(config: wjjRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}
