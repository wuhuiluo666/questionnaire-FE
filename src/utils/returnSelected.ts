import { ComponentProps } from '../store/componentList'

export const genNewSelectedId = (
  fe_id: string,
  componentsList: ComponentProps[]
) => {
  // 拿到当前选中元素的下标
  const visibleComponentList = componentsList.filter(component => !component.isHidden)
  const currentComponentIndex = visibleComponentList.findIndex(component => component.fe_id === fe_id)
  // 没选中
  if(currentComponentIndex < 0) {
    return ''
  }
  // 选中
  let newSelectedId
  const len = visibleComponentList.length
  // 只有一项也是直接为空
  if(len <= 1) {
    return ''
  }
  // 点击了最后一项
  if(currentComponentIndex + 1 === len) {
    newSelectedId = visibleComponentList[currentComponentIndex - 1].fe_id
  } else {
    newSelectedId = visibleComponentList[currentComponentIndex + 1].fe_id
  }
  return newSelectedId
}
