import { StateType } from './store'
export type actionType = {
  type: string
  payload?: any
}

export const reducer = (state: StateType[], action: actionType) => {
  switch (action.type) {
    case 'add':
      return state.concat(action.payload)
    case 'delete':
      return state.filter((item) => item.id !== action.payload)
    default:
      throw new Error()
  }
}
