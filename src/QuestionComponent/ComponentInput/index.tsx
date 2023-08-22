import React from 'react'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

export type ComponentInputProps = {
    title?: string,
    placeholder?: string,
    onChange?: (data: ComponentInputProps) => void
}

export const defaultProps: ComponentInputProps = {
    title: '输入框标题',
    placeholder: '请输入',
}

export const ComponentInput = (props: ComponentInputProps) => {
    const { title = '输入框标题', placeholder = '请输入' } = { ...defaultProps, ...props }
    return <div>
        <Paragraph strong>{title}</Paragraph>
        <div>
            <Input placeholder={placeholder} />
        </div>
    </div>
}