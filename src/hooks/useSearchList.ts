import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionList } from '../services/question'

export const useSearchList = (isStar?: boolean, isDeleted?: boolean) => {
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '') || 1
  const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
  const { data, loading, error } = useRequest(
    async () => {
      const data = await getQuestionList({
        keyword: searchParams.get('keyword') || '',
        isStar,
        isDeleted,
        page,
        pageSize
      })
      return data
    },
    {
      refreshDeps: [searchParams]
    }
  )
  return {
    total: data?.total,
    list: data?.list,
    loading,
    error
  }
}
