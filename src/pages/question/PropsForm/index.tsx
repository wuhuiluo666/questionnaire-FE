import React from 'react'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { GetComponentByType } from '../../../QuestionComponent'

const NoProp = () => {
    return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

export const PropsForm = () => {
    const { currentComponent } = useGetComponentsList()
    if (currentComponent === undefined) return <NoProp /> // 当前的组件
    const { type, props } = currentComponent
    const componentConfig = GetComponentByType(type)
    if (componentConfig === undefined) return <NoProp />
    const { ComponentProps } = componentConfig
    return <ComponentProps  {...props} />
}