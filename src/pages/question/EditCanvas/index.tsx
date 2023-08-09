import React from 'react'
import styles from './index.module.scss'
import { ComponentInput } from '../../../components/ComponentInput'
import { ComponentTitle } from '../../../components/ComponentTitle'

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