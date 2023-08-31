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
        {
            // ['我是谁','啊是','没有'] 换行处理成这样的数组
            // text.split('\n').map((text, index) => {
            //     return <span key={text}>
            //         {/* 第二行开始换行+文字 */}
            //         {index > 0 && <br />}
            //         {text}
            //     </span>
            // })
            text.split('\n').map((text, index) => (
                <span key={text}>
                    {index > 0 && <br />}
                    {text}
                </span>
            ))
        }
    </Typography.Paragraph>
}