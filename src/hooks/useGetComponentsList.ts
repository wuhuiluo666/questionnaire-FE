import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { ComponentsStateProps } from '../store/componentList'

export const useGetComponentsList = () => {
  const { componentsList, selectedId, copyComponent } = useSelector<StoreState>(
    (state) => state.components
  ) as ComponentsStateProps
  // 找到当前选中的currentComponent
  const currentComponent = componentsList?.find(
    (component) => component.fe_id === selectedId
  )
  return {
    componentsList,
    selectedId,
    currentComponent,
    copyComponent
  }
}
