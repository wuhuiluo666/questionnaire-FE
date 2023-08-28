import { ComponentProps } from '../store/componentList'

export const genNewSelectedId = (
  fe_id: string,
  componentsList: ComponentProps[]
) => {
  // 拿到当前选中元素的下表
  const currentComponentIndex = componentsList.findIndex(component => component.fe_id === fe_id)
  // 没选中
  if(currentComponentIndex < 0) {
    return ''
  }
  // 选中
  let newSelectedId
  const len = componentsList.length
  if(len <= 1) {
    newSelectedId = ''
  }
  // 点击了最后一项
  if(currentComponentIndex + 1 === len) {
    newSelectedId = componentsList[currentComponentIndex - 1].fe_id
  } else {
    newSelectedId = componentsList[currentComponentIndex + 1].fe_id
  }
  return newSelectedId
}