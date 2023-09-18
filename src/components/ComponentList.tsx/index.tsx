import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useGetComponentsList } from '../../hooks/useGetComponentsList'
import { ComponentProps } from '../../store/componentList'
import { GetComponentByType } from '../../QuestionComponent'

interface ComponentListType {
    selectedComponentId: string
    setSelectedComponentId: (selectedComponentId: string) => void
}

export const ComponentList = (props: ComponentListType) => {
    const { selectedComponentId, setSelectedComponentId } = props
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
            componentsList.filter(c => !c.isHidden).map(c => {
                const wrapperDefaultClassName = styles['component-wrapper']
                const selectedClassName = styles.selected
                const wrapperClassName = classNames({
                    [wrapperDefaultClassName]: true,
                    [selectedClassName]: selectedComponentId === c.fe_id
                })
                return <div key={c.fe_id} onClick={() => setSelectedComponentId(c.fe_id)} className={wrapperClassName}>
                    <div className={styles.component}>
                        <ComponentItem {...c} />
                    </div>
                </div>
            })
        }
    </div>
}