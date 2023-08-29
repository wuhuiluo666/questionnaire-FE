import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionDetail } from '../services/question'
import { resetComponents } from '../store/componentList'
import { useDispatch } from 'react-redux'

export const useGetQuestionDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { run, loading, data } = useRequest(
    async () => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionDetail(id)
      return data
    },
    {
      manual: true // 手动
    }
  )

  useEffect(() => {
    if (!data) return
    const { componentsList = [] } = data
    let selectedId = ''
    if (componentsList.length) {
      selectedId = componentsList[0].fe_id
    }
    dispatch(
      resetComponents({
        selectedId,
        componentsList,
        copyComponent: null
      })
    )
  }, [data])
  useEffect(() => {
    run()
  }, [id])

  return {
    loading
  }
}
