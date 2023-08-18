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
        draft.componentsList.push(action.payload)
      }
    )
  }
})

export const { resetComponents, changeSelectedId, addComponent } =
  ComponentsSlice.actions
export default ComponentsSlice.reducer
