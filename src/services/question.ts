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
  const url = `https://question-server.onrender.com/api/question/${id}`
  const data = (await instance.get(url)) as ResDataType
  return data
}

// 创建问卷
export const createNewQuestion = async (): Promise<ResDataType> => {
  const url = 'https://question-server.onrender.com/api/question'
  const data = (await instance.post(url)) as ResDataType
  return data
}

// 获取问卷列表
export const getQuestionList = async (
  searchParams: Partial<SearchType> = {}
): Promise<ResDataType> => {
  const url = 'https://question-server.onrender.com/api/question'
  const data = (await instance.get(url, {
    params: searchParams
  })) as ResDataType
  return data
}

// 更新问卷
export const changeQuestionStar = async (
  id: string,
  option: { [key: string]: any }
): Promise<ResDataType> => {
  const url = `https://question-server.onrender.com/api/question/${id}`
  const data = (await instance.patch(url, option)) as ResDataType
  return data
}

// 复制问卷
export const copyQuestion = async (id: string): Promise<ResDataType> => {
  const url = `https://question-server.onrender.com/api/question/copy/${id}`
  const data = (await instance.post(url)) as ResDataType
  return data
}

// 删除问卷
export const deleteQuestion = async (ids: string[]) => {
  const url = 'https://question-server.onrender.com/api/question'
  const data = (await instance.delete(url, {
    data: ids
  })) as ResDataType
  return data
}
