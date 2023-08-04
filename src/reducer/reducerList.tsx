import React, { useReducer } from 'react'
import { createContext } from 'react'
import { InputForm } from './InputForm'
import { List } from './List'
import { actionType, reducer } from './reducer'
import { initialState } from './store'

export const Context = createContext({
    state: initialState,
    dispatch: (action: actionType) => { }
})

export const ReducerList = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Context.Provider value={{ state, dispatch }}>
        <p>Reducer DemoList</p>
        <List />
        <InputForm />
    </Context.Provider>
}
