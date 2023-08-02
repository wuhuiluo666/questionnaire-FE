import { Button } from 'antd'
import React, { useContext } from 'react'
import { ThemeContext } from './demo'

export const One = () => {
    const { color, background } = useContext(ThemeContext)
    const style = {
        color,
        background
    }
    return <>
        <Button style={style}>测试useContext</Button>
    </>
}