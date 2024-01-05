import instance, { ResDataType } from './ajax'

type StaticOption = {
  pageSize: number
  page: number
}

export const getStaticListService = async (
  questionId: string,
  option: StaticOption
): Promise<ResDataType> => {
  const url = `https://huy.wiki:3002/api/static/${questionId}`
  const data = (await instance.get(url, { params: option })) as ResDataType
  return data
}

export const getChartListService = async (
  questionId: string,
  componentId: string
): Promise<ResDataType> => {
  const url = `https://huy.wiki:3002/api/static/${questionId}/${componentId}`
  const data = (await instance.get(url)) as ResDataType
  return data
}
