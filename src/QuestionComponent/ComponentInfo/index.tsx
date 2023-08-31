import React from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export type ComponentInfoProps = {
    title?: string
    desc?: string
    onChange?: (data: ComponentInfoProps) => void
    isLocked?: boolean
}

export const defaultProps: ComponentInfoProps = {
    title: '问卷标题',
    desc: '问卷描述'
}

export const ComponentInfo = (props: ComponentInfoProps) => {
    const { title = '问卷标题', desc = '问卷描述' } = { ...defaultProps, ...props }
    return <div style={{ textAlign: 'center' }}>
        <Title style={{ fontSize: '24px' }} level={1}>{title}</Title>
        <Paragraph>
            {/* {
                desc.split('\n').map((desc, index) => {
                    return <span>
                        {index > 0 && <br />}
                        {desc}
                    </span>
                })
            } */}
            {
                desc.split('\n').map((desc, index) => (
                    <span>
                        {
                            index > 0 && <br />
                        }
                        {
                            desc
                        }
                    </span>
                ))
            }
        </Paragraph>
    </div>
}