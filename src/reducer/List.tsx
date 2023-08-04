import React, { useReducer } from 'react'
import { reducer } from './reducer'
import { initialState } from './store'

export const List = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const deleteItem = (id: string) => {
        dispatch({ type: 'delete', payload: id })
    }
    return <>
        <ul>
            {
                state.map(item => (
                    <div>
                        <li key={item.id}>
                            {item.title}
                        </li>
                        <button onClick={() => }>删除</button>
                    </div>
                ))
            }
        </ul>
    </>
}