import instance, { ResDataType } from './ajax'

interface SearchType {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取问卷详情
export const getQuestionDetail = async (id: string): Promise<ResDataType> => {
  const url = `/api/question/${id}`
  const data = (await instance.get(url)) as ResDataType
  return data
}

// 创建问卷
export const createNewQuestion = async (): Promise<ResDataType> => {
  const url = '/api/question'
  const data = (await instance.post(url)) as ResDataType
  return data
}

// 获取问卷列表
export const getQuestionList = async (
  searchParams: Partial<SearchType> = {}
): Promise<ResDataType> => {
  const url = '/api/question'
  const data = (await instance.get(url, {
    params: searchParams
  })) as ResDataType
  return data
}
