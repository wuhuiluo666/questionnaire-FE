import { ComponentProps } from '../store/componentList'

export const genNewSelectedId = (
  fe_id: string,
  componentList: ComponentProps[]
) => {
  // 获取当前删除项的Index
  const currentComponentIndex = componentList.findIndex(
    (component) => component.fe_id === fe_id
  )
  // 选中的新Id
  let newSelectedId = ''
  // 没选中
  if (currentComponentIndex < 0) {
    newSelectedId = ''
  }
  // 选中了
  // 1.只有一项
  if (currentComponentIndex + 1 === componentList.length) {
    newSelectedId = ''
  } else {
    // 2.不止一项
    newSelectedId = componentList[currentComponentIndex + 1].fe_id
  }
  return newSelectedId
}
