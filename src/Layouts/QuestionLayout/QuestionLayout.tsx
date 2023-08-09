import React from 'react'
import styles from './QuestionLayout.module.scss'
import { Outlet } from 'react-router-dom'

const QuestionLayout = () => {
    return <div style={{ height: '100vh' }}>
        <Outlet />
    </div>
}

export default QuestionLayout