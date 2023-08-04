import { nanoid } from 'nanoid'

export type StateType = {
  id: string
  title: string
}

export const initialState: StateType[] = [
  {
    id: nanoid(),
    title: '苹果'
  },
  {
    id: nanoid(),
    title: '香蕉'
  }
]
