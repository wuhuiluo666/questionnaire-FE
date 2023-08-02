import React, { useReducer } from 'react'
import { Button } from 'antd'

type StateType = {
    count: number
}
type ActionType = {
    type: string
}

export const ReducerDemo = () => {
    const initState = { count: 100 }
    const reducer = (state: StateType, action: ActionType) => {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 }
            case 'decrement':
                return { count: state.count - 1 }
            default:
                throw new Error()
        }
    }
    const [state, dispatch] = useReducer(reducer, initState)
    return <>
        <p>{state.count}</p>
        <Button onClick={() => dispatch({ type: 'increment' })}>add count</Button>
        <Button onClick={() => dispatch({ type: 'decrement' })}>decrement count</Button>
    </>
}