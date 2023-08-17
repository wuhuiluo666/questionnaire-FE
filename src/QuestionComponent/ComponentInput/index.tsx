import React from 'react'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

export type ComponentInputProps = {
    text?: string,
    placeholder?: string
}

export const defaultProps: ComponentInputProps = {
    text: '输入框标题',
    placeholder: '请输入',
}

export const ComponentInput = (props: ComponentInputProps) => {
    const { text = '输入框标题', placeholder = '请输入' } = { ...defaultProps, ...props }
    return <div>
        <Paragraph strong>{text}</Paragraph>
        <div>
            <Input placeholder={placeholder} />
        </div>
    </div>
}