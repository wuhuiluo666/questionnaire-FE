import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { AllComponentProps } from '../QuestionComponent'
import { genNewSelectedId } from '../utils/returnSelected'

// 单个组件的属性
export type ComponentProps = {
  fe_id: string
  title: string
  type: string
  isHidden?: boolean
  isLocked?: boolean
  props: AllComponentProps
}

export type ComponentsStateProps = {
  selectedId: string
  componentsList: ComponentProps[]
}

const initialState: ComponentsStateProps = {
  selectedId: '',
  componentsList: []
}

export const ComponentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    resetComponents: (
      state: ComponentsStateProps,
      action: PayloadAction<ComponentsStateProps>
    ) => {
      return action.payload
    },
    changeSelectedId: produce(
      (draft: ComponentsStateProps, action: PayloadAction<string>) => {
        draft.selectedId = action.payload
      }
    ),
    addComponent: produce(
      (draft: ComponentsStateProps, action: PayloadAction<ComponentProps>) => {
        const newComponent = action.payload
        // 找到目前被选中的下标
        const Index = draft.componentsList.findIndex(
          (component) => component.fe_id === draft.selectedId
        )
        // findIndex 有就返回0或者以上 没有找到就返回-1
        if (Index >= 0) {
          // 选中 添加至下一个
          draft.componentsList.splice(Index + 1, 0, newComponent)
        } else {
          // 未选中 添加至末尾
          draft.componentsList.push(newComponent)
        }
        // 将新添加的组件设置为选中状态
        draft.selectedId = newComponent.fe_id
      }
    ),
    changeComponentProps: produce(
      (
        draft: ComponentsStateProps,
        action: PayloadAction<{ id: string; newProps: AllComponentProps }>
      ) => {
        const { id, newProps } = action.payload
        const currentComponent = draft.componentsList.find(
          (component) => component.fe_id === id
        )
        if (currentComponent) {
          currentComponent.props = {
            ...currentComponent.props,
            ...newProps
          }
        }
      }
    ),
    // 删除组件
    deleteComponent: produce((draft: ComponentsStateProps) => {
      const { componentsList = [], selectedId = '' } = draft
      const newSelectedId = genNewSelectedId(selectedId, componentsList)
      draft.selectedId = newSelectedId
      const Index = componentsList.findIndex(
        (component) => component.fe_id === selectedId
      )
      if (Index >= 0) {
        componentsList.splice(Index, 1)
      }
    }),
    // 隐藏/显示组件
    hiddenComponent: produce(
      (
        draft: ComponentsStateProps,
        action: PayloadAction<{ fe_id: string; hidden: boolean }>
      ) => {
        const { componentsList = [] } = draft
        const { fe_id, hidden } = action.payload
        let newSelectedId
        // 需要隐藏
        if (hidden) {
          newSelectedId = genNewSelectedId(fe_id, componentsList)
        } else {
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId
        // 隐藏或者显示当前选中的组件
        const curComp = componentsList.find(
          (component) => component.fe_id === fe_id
        )
        if (curComp) {
          curComp.isHidden = hidden
        }
      }
    ),
    // 锁定/解锁组件
    lockedComponent: produce(
      (
        draft: ComponentsStateProps,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        const { componentsList } = draft
        const { fe_id } = action.payload
        const curComp = componentsList.find(
          (component) => component.fe_id === fe_id
        )
        if (curComp === undefined) return
        curComp.isLocked = !curComp.isLocked
      }
    )
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteComponent,
  hiddenComponent,
  lockedComponent
} = ComponentsSlice.actions
export default ComponentsSlice.reducer
