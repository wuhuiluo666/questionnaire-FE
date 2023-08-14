import React from 'react'
import styles from './index.module.scss'
import { ComponentInput } from '../../../QuestionComponent/ComponentInput'
import { ComponentTitle } from '../../../QuestionComponent/ComponentTitle'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'

export const EditCanvas = () => {
    const { componentsList } = useGetComponentsList()
    console.log('componentsList', componentsList)
    return <div className={styles.canvas}>
        <div className={styles['component-wrapper']}>
            <div className={styles.component}>
                <ComponentTitle />
            </div>
        </div>
        <div className={styles['component-wrapper']}>
            <div className={styles.component}>
                <ComponentInput />
            </div>
        </div>
    </div>
}