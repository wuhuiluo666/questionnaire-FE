import React from 'react'
import { useDispatch } from 'react-redux'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { AllComponentProps, GetComponentByType } from '../../../QuestionComponent'
import { changeComponentProps } from '../../../store/componentList'

const NoProp = () => {
    return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

export const PropsForm = () => {
    const dispatch = useDispatch()
    const { currentComponent } = useGetComponentsList()
    if (currentComponent === undefined) return <NoProp /> // 当前的组件
    const { fe_id, type, props, isLocked } = currentComponent
    const componentConfig = GetComponentByType(type) // 为什么要找因为要传入props
    if (componentConfig === undefined) return <NoProp />
    const changeProps = (newProps: AllComponentProps) => {
        if (!currentComponent) return
        dispatch(changeComponentProps({ id: fe_id, newProps }))
    }
    const { ComponentProps } = componentConfig
    return <ComponentProps isLocked={isLocked} onChange={changeProps} {...props} />
}