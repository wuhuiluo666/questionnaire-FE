import instance, { ResDataType } from './ajax'

export const getQuestionDetail = async (id: string) => {
    const url = `/api/question/${id}`
    const data = (await instance.get(url)) as ResDataType
    return data
}