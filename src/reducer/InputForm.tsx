import { Input } from 'antd'
import { nanoid } from 'nanoid'
import React, { ChangeEvent, useContext, useReducer, useState } from 'react'
import { reducer } from './reducer'
import { Context } from './reducerList'
import { initialState } from './store'

export const InputForm = () => {
    const { state, dispatch } = useContext(Context)
    const [text, setText] = useState('')
    const submitForm = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!text.trim()) return
        dispatch({
            type: 'add', payload: {
                id: nanoid(),
                title: text
            }
        })
        setText('')
    }
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    return <>
        <form onSubmit={submitForm}>
            <div>add todo task</div>
            <input onChange={change} value={text} />
            <button>add {state.length + 1}</button>
        </form>
    </>
}