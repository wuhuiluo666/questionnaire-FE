import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionDetail } from '../services/question'
import { resetComponents } from '../store/componentList'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../store/pageInfo'

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
    const { title, desc, css, js, isPublished, componentList = [] } = data
    let selectedId = ''
    if (componentList.length) {
      selectedId = componentList[0].fe_id
    }
    dispatch(
      resetComponents({
        selectedId,
        componentsList: componentList,
        copyComponent: null
      })
    )
    dispatch(
      resetPageInfo({
        title,
        desc,
        css,
        js,
        isPublished
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
