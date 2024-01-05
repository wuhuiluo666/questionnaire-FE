import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/token'
export type ResDataType = {
  [key: string]: any
}

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

const instance = axios.create({
  timeout: 10 * 1000
})

instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use((res) => {
  const { errno, data, msg } = (res.data || {}) as ResType
  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance
