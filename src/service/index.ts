// 导入配置
import { BASE_URL, timeout } from './config'
//统一出口
import { wjjRequest } from '@/service/request'

//创建axios实例
//TODO:错误处理
const request_util = new wjjRequest({
  baseURL: BASE_URL,
  interceptor: {
    requestOnFulfilled(config) {
      return config
    },
    responseOnFulfilled(res) {
      return res.data
    },
  },
  timeout,
})

export { request_util }
