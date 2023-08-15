import React from 'react'
import styles from './index.module.scss'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { Spin } from 'antd'
import { ComponentProps } from '../../../store/componentList'
import { GetComponentByType } from '../../../QuestionComponent'

export const EditCanvas = ({ loading }: { loading: boolean }) => {
    // 渲染组件
    const genComponent = (component: ComponentProps) => {
        const { type, props } = component // 后端数据获取的type和props
        const ComponentConfig = GetComponentByType(type) // 根据type返回Component
        if (!ComponentConfig) return null
        const { Component } = ComponentConfig
        return <Component {...props} />
    }
    const { componentsList } = useGetComponentsList() // redux获取componentsList
    if (loading) {
        return <Spin size={'large'} style={{ position: 'relative', top: '50%', left: '50%' }} />
    }
    return <div className={styles.canvas}>
        {
            componentsList.map((component: ComponentProps) => {
                const { fe_id } = component
                return <div key={fe_id} className={styles['component-wrapper']}>
                    <div className={styles.component}>
                        {genComponent(component)}
                    </div>
                </div>
            })
        }
    </div>
}