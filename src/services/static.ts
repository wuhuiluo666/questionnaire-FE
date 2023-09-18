import instance, { ResDataType } from './ajax'

type StaticOption = {
  pageSize: number
  page: number
}

export const getStaticListService = async (
  questionId: string,
  option: StaticOption
): Promise<ResDataType> => {
  const url = `/api/static/${questionId}`
  const data = (await instance.get(url, { params: option })) as ResDataType
  return data
}
