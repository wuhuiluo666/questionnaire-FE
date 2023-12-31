import instance, { ResDataType } from './ajax'

export const getUserInfo = async () : Promise<ResDataType> => {
  const url = 'https://huy.wiki:3002/api/user/info'
  const data = (await instance.get(url)) as ResDataType
  return data
}

export const LoginUser = async (user: {
  username: string
  password: string
}): Promise<ResDataType> => {
  const url = 'https://huy.wiki:3002/api/user/login'
  const data = (await instance.post(url, user)) as ResDataType
  return data
}

export const RegisterUser = async (user: {
  username: string
  password: string
  nickName?: string
}) => {
  const url = 'https://huy.wiki:3002/api/user/register'
  const data = (await instance.post(url, user)) as ResDataType
  return data
}
