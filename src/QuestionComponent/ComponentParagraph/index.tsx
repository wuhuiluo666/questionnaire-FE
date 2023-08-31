import React from 'react'
import { Typography } from 'antd'

export type ComponentParagraphProps = {
    text?: string
    isCenter?: boolean
    // propsForm用的属性
    onChange?: (data: ComponentParagraphProps) => void
    isLocked?: boolean
}

export const defaultProps: ComponentParagraphProps = {
    text: '段落',
    isCenter: false
}

export const ComponentPragraph = (props: ComponentParagraphProps) => {
    const { text = '段落', isCenter = false } = { ...defaultProps, ...props }
    return <Typography.Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
        {text}
    </Typography.Paragraph>
}