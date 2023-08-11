import React from 'react'
import styles from './index.module.scss'
import { ComponentInput } from '../../../QuestionComponent/ComponentInput'
import { ComponentTitle } from '../../../QuestionComponent/ComponentTitle'

export const EditCanvas = () => {
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