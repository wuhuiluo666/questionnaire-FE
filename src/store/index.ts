import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserType } from './user'
import componentReducer, { ComponentsStateProps } from './componentList'
import pageInfoReducer, { PageInfoStateProps } from './pageInfo'

export interface StoreState {
  user: UserType
  components: StateWithHistory<ComponentsStateProps>
  pageInfo: PageInfoStateProps
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/upArrow',
        'components/downArrow',
        'components/changeSelectedId'
      ])
    }),
    pageInfo: pageInfoReducer
  }
})
