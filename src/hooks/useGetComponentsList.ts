import { Store } from 'antd/es/form/interface'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { ComponentsStateProps } from '../store/componentList'

export const useGetComponentsList = () => {
  const { componentsList,selectedId } = useSelector<StoreState>(
    (state) => state.components
  ) as ComponentsStateProps
  return {
    componentsList,
    selectedId
  }
}
