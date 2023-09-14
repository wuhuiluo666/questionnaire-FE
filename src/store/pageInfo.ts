import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoStateProps = {
  title: string
  desc?: string
  js?: string
  css?: string
}

const initialState: PageInfoStateProps = {
  title: '',
  desc: '',
  js: '',
  css: ''
}

export const PageInfoSlice = createSlice({
  name: 'pageinfo',
  initialState,
  reducers: {
    resetPageInfo: (
      state: PageInfoStateProps,
      action: PayloadAction<PageInfoStateProps>
    ) => {
      return action.payload
    },
    changePageTitle: produce(
      (
        draft: PageInfoStateProps,
        action: PayloadAction<{ newTitle: string }>
      ) => {
        const { newTitle } = action.payload
        draft.title = newTitle
      }
    )
  }
})

export const { resetPageInfo, changePageTitle } = PageInfoSlice.actions
export default PageInfoSlice.reducer
