import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { PageInfoStateProps } from '../store/pageInfo'

export const useGetPageInfo = () => {
  const { title, desc, js, css } = useSelector<StoreState>(
    (state) => state.pageInfo
  ) as PageInfoStateProps
  return {
    title,
    desc,
    js,
    css
  }
}
