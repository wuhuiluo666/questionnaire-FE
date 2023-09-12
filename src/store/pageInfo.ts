import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    }
  }
})

export const { resetPageInfo } = PageInfoSlice.actions
export default PageInfoSlice.reducer
