import { Button } from 'antd'
import React, { createContext, useState } from 'react'
import { One } from './one'
import { Two } from './two'

const themes = {
    light: {
        color: '#000',
        background: '#eee'
    },
    dark: {
        color: '#fff',
        background: '#222'
    }
}

export const ThemeContext = createContext(themes.light)

export const Demo = () => {
    const [theme, setTheme] = useState(themes.light)
    return <ThemeContext.Provider value={theme}>
        <div>
            <p>Theme Context</p>
            <Button onClick={() => setTheme(themes.dark)}></Button>
        </div>
        <One />
        <Two />
    </ThemeContext.Provider>
}