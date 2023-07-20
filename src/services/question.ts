import instance, { ResDataType } from './ajax'

// 获取问卷详情
export const getQuestionDetail = async (id: string): Promise<ResDataType> => {
    const url = `/api/question/${id}`
    const data = (await instance.get(url)) as ResDataType
    return data
}

// 创建问卷
export const createNewQuestion = async () => {
    const url = '/api/question'
    const data = (await instance.post(url)) as ResDataType
    return data
}