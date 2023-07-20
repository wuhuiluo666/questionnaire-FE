import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionDetail } from '../services/question'

export const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const loadData = async () => {
    return await getQuestionDetail(id)
  }
  const { loading, error, data } = useRequest(loadData)
  return {
    loading,
    error,
    data
  }
}
