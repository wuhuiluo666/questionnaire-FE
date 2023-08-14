import React from 'react'
import styles from './index.module.scss'
import { ComponentInput } from '../../../QuestionComponent/ComponentInput'
import { ComponentTitle } from '../../../QuestionComponent/ComponentTitle'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { Spin } from 'antd'

export const EditCanvas = ({ loading }: { loading: boolean }) => {
    const { componentsList } = useGetComponentsList()
    if (loading) {
        return <Spin size={'large'} style={{ position: 'relative', top: '50%', left: '50%' }} />
    }
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