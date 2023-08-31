import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { useAddComponent } from '../hooks/useAddComponent'
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
  copyComponent: ComponentProps | null
  componentsList: ComponentProps[]
}

const initialState: ComponentsStateProps = {
  selectedId: '',
  copyComponent: null,
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
    ),
    // 复制组件
    copyNewComponent: produce((draft: ComponentsStateProps) => {
      // 找到当前选中的组件
      const { componentsList, selectedId } = draft
      const curComponent = componentsList.find(
        (component) => component.fe_id === selectedId
      )
      if (curComponent === undefined) return
      draft.copyComponent = cloneDeep(curComponent)
    }),
    // 粘贴组件
    pasteComponent: produce((draft: ComponentsStateProps) => {
      const { copyComponent } = draft
      if (copyComponent === null) return
      // 确保fe_id是唯一的
      copyComponent.fe_id = nanoid()
      useAddComponent(draft, copyComponent)
    }),
    // 移动到上一个选中的
    upArrow: produce((draft: ComponentsStateProps) => {
      const { componentsList, selectedId } = draft
      const curCompIndex = componentsList.findIndex(
        (component) => component.fe_id === selectedId
      )
      if (curCompIndex <= 0) {
        return
      } else {
        const newSelectedId = componentsList[curCompIndex - 1].fe_id
        draft.selectedId = newSelectedId
      }
    }),
    // 移动到下一个选中的
    downArrow: produce((draft: ComponentsStateProps) => {
      const { componentsList, selectedId } = draft
      const curCompIndex = componentsList.findIndex(
        (component) => component.fe_id === selectedId
      )
      if (curCompIndex < 0 || curCompIndex + 1 === componentsList.length) return
      const newSelectedId = componentsList[curCompIndex + 1].fe_id
      draft.selectedId = newSelectedId
    })
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteComponent,
  hiddenComponent,
  lockedComponent,
  copyNewComponent,
  pasteComponent,
  upArrow,
  downArrow
} = ComponentsSlice.actions
export default ComponentsSlice.reducer
