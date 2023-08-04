import React, { useContext, useReducer } from 'react'
import { reducer } from './reducer'
import { Context } from './reducerList'
import { initialState } from './store'

export const List = (props: any) => {
    const { state, dispatch } = useContext(Context)
    const deleteItem = (id: string) => {
        dispatch({ type: 'delete', payload: id })
    }
    return <>
        <ul>
            {
                state.map(item => (
                    <div key={item.id}>
                        <li>
                            {item.title}
                        </li>
                        <button onClick={() => deleteItem(item.id)}>删除</button>
                    </div>
                ))
            }
        </ul>
    </>
}