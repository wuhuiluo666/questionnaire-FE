import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserType } from './user'
import componentReducer, { ComponentsStateProps } from './componentList'

export interface StoreState {
  user: UserType
  components: ComponentsStateProps
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    components: componentReducer
  }
})
