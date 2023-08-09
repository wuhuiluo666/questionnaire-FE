import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

interface ComponentTitleProps {
    title?: string
    level?: 1 | 2 | 3 | 4 | 5
    isCenter?: boolean
}

const defaultProps: ComponentTitleProps = {
    title: '默认标题',
    level: 1,
    isCenter: false
}

export const ComponentTitle = (props: ComponentTitleProps) => {
    const genFontSize = (level: number) => {
        if (level === 1) return '24px'
        if (level === 2) return '20px'
        return '16px'
    }
    const { title = '默认标题', level = 1, isCenter = false } = { ...defaultProps, ...props }
    return <Title level={level} style={{ textAlign: isCenter ? 'center' : 'start', marginTop: 0, marginBottom: 0, fontSize: genFontSize(level) }}>
        {title}
    </Title>
}