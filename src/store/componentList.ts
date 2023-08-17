import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

// 单个组件的属性
export type ComponentProps = {
  fe_id: string
  title: string
  type: string
  props: ComponentProps
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
    changeSelectedId: produce((draft: ComponentsStateProps, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    })
  }
})

export const { resetComponents,changeSelectedId } = ComponentsSlice.actions
export default ComponentsSlice.reducer