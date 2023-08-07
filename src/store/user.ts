import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserType {
  nickName: string
  userName: string
}

const initialState: UserType = { nickName: '', userName: '' }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer: (state: UserType, action: PayloadAction<UserType>) => {
      return action.payload
    },
    logoutReducer: (state: UserType, action: PayloadAction<UserType>) => {
      return initialState
    }
  }
})

export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer
