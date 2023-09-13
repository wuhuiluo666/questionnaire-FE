import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserType } from './user'
import componentReducer, { ComponentsStateProps } from './componentList'
import pageInfoReducer, { PageInfoStateProps } from './pageInfo'

export interface StoreState {
  user: UserType
  components: ComponentsStateProps
  pageInfo: PageInfoStateProps
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    components: componentReducer,
    pageInfo: pageInfoReducer
  }
})
