import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  deleteComponent,
  copyNewComponent,
  pasteComponent
} from '../store/componentList'

// 判断当前的元素是否合法
const isValidActiveElement = () => {
  const ele = document.activeElement
  if (ele === document.body) return true
  return false
}

export const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  // 删除快捷键
  useKeyPress(['backspace'], () => {
    if (!isValidActiveElement) return
    dispatch(deleteComponent())
  })
  // 复制快捷键
  useKeyPress(['ctrl.c'], () => {
    if (!isValidActiveElement) return
    dispatch(copyNewComponent())
  })
  // 粘贴快捷键
  useKeyPress(['ctrl.v'], () => {
    if (!isValidActiveElement) return
    dispatch(pasteComponent())
  })
  // 上移
  useKeyPress(['uparrow'], () => {
    console.log('111上移')
  })
  // 下移
  useKeyPress(['downarrow'], () => {
    console.log('xxx22')
  })
}
