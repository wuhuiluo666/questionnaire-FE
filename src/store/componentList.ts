import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentProps } from '../QuestionComponent'

// 单个组件的属性
export type ComponentProps = {
  fe_id: string
  title: string
  type: string
  props: ComponentProps
}

export type ComponentsStateProps = {
  componentsList: ComponentProps[]
}

const initialState: ComponentsStateProps = {
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
    }
  }
})

export const { resetComponents } = ComponentsSlice.actions
export default ComponentsSlice.reducer