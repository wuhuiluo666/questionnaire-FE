import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { ComponentsStateProps } from '../store/componentList'

export const useGetComponentsList = () => {
  const { componentsList } = useSelector<StoreState>(
    (state) => state.components
  ) as ComponentsStateProps

  return {
    componentsList
  }
}
