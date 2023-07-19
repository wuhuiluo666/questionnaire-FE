import axios from 'axios'
import { message } from 'antd'
export type ResDataType = {
  [key: string]: any
}

export type ResType = {
  error: number
  data?: ResDataType
  msg?: string
}

const instance = axios.create({
  timeout: 10 * 1000
})

instance.interceptors.response.use((res) => {
  const { error, data, msg } = (res.data || {}) as ResType
  if (error !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance
