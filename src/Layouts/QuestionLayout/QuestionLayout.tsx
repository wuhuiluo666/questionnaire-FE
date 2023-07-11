import React from 'react'
import styles from './QuestionLayout.module.scss'
import { Outlet } from 'react-router-dom'

const QuestionLayout = () => {
    return <>
        <div>
            <p>QuestionLayout</p>
        </div>
        <div>
            {<Outlet />}
        </div>
    </>
}

export default QuestionLayout