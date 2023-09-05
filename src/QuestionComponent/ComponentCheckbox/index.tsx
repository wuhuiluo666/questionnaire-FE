import React from 'react'
import { Typography, Space, Checkbox } from 'antd'

const { Paragraph } = Typography

export type ListType = {
    text: string
    value: string
    checked: boolean
}

export type ComponentCheckBoxProps = {
    title?: string
    isVertical?: boolean
    list?: ListType[]
    onChange?: (data: ComponentCheckBoxProps) => void
    isLocked?: boolean
}

export const defaultProps = {
    title: '复选标题',
    isVertical: false,
    list: [
        { text: '选项1', value: 'item1', checked: false },
        { text: '选项2', value: 'item2', checked: false },
        { text: '选项3', value: 'item3', checked: false }
    ]
}

export const ComponentCheckBox = (props: ComponentCheckBoxProps) => {
    const { title = '复选标题', isVertical = false, list = [] } = { ...defaultProps, ...props }
    return <div>
        <Paragraph>{title}</Paragraph>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
            {
                list.map(l => {
                    const { text, value, checked } = l
                    return (
                        <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
                    )
                })
            }
        </Space>
    </div>
}