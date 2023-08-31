import React, { Component } from 'react'
import styles from './index.module.scss'
import { ComponentConfig, ComponentConfigGroup } from '../../../QuestionComponent'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentList'
import { nanoid } from 'nanoid'

const { Title } = Typography

export const ComponentLib = () => {
    const dispatch = useDispatch()
    // click组件添加到中间
    const genComponent = (c: ComponentConfig) => {
        const { title, type, Component, defaultProps } = c
        const handleClick = () => {
            dispatch(addComponent({
                fe_id: nanoid(),
                type,
                title,
                props: {
                    ...defaultProps,
                }
            }))
        }
        return <div onClick={handleClick} key={type} className={styles.wrapper}>
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    }
    return <>
        {
            ComponentConfigGroup.map((group, index) => {
                const { group_id, groupName, components } = group
                return <div key={group_id}>
                    <Title level={3} style={{ marginTop: index > 0 ? '20px' : 0, marginBottom: 0, fontSize: '16px' }}>{groupName}</Title>
                    <div>
                        {
                            components.map(component => genComponent(component))
                        }
                    </div>
                </div>
            })
        }
    </>
}