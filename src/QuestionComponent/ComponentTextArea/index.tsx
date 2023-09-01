import React from 'react'
import { Typography, Input } from 'antd'


const { Paragraph } = Typography
const { TextArea } = Input


export type ComponentTextAreaProps = {
    title?: string
    placeholder?: string
    onChange?: (data: ComponentTextAreaProps) => void
    isLocked?: boolean
}

export const defaultProps = {
    title: '输入框标题',
    placeholder: '请输入...'
}

export const ComponentTextArea = (props: ComponentTextAreaProps) => {
    const { title, placeholder } = { ...defaultProps, ...props }
    return <div>
        <Paragraph strong>{title}</Paragraph>
        <TextArea placeholder={placeholder}></TextArea>
    </div>
}