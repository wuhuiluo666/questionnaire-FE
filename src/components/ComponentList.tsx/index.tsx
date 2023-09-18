import React from 'react'
import styles from './index.module.scss'
import { useGetComponentsList } from '../../hooks/useGetComponentsList'
import { ComponentProps } from '../../store/componentList'
import { GetComponentByType } from '../../QuestionComponent'

export const ComponentList = () => {
    const ComponentItem = (c: ComponentProps) => {
        const { props, type } = c
        const ComponentConfig = GetComponentByType(type)
        if (!ComponentConfig) return null
        const { Component } = ComponentConfig
        return <Component {...props} />
    }
    const { componentsList } = useGetComponentsList()
    return <div className={styles.canvas}>
        {
            componentsList.map(c => {
                return <div className={styles['component-wrapper']}>
                    <div className={styles.component}>
                        <ComponentItem {...c} />
                    </div>
                </div>
            })
        }
    </div>
}