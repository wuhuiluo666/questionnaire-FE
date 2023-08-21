import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { AllComponentProps } from '../QuestionComponent'

// 单个组件的属性
export type ComponentProps = {
  fe_id: string
  title: string
  type: string
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
    )
  }
})

export const { resetComponents, changeSelectedId, addComponent } =
  ComponentsSlice.actions
export default ComponentsSlice.reducer
