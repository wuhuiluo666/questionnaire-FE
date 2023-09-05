import React from 'react'
import { Radio, Space, Typography } from 'antd'

const { Paragraph
} = Typography

type OptionType = {
    text: string,
    value: string
}

export type ComponentRadioProps = {
    title?: string
    isVertical?: boolean
    options?: OptionType[],
    value?: string
    onChange?: (data: ComponentRadioProps) => void
    isLocked?: boolean
}

export const defaultProps: ComponentRadioProps = {
    title: '单选框标题',
    isVertical: false,
    options: [
        { text: '选项1', value: 'item1' },
        { text: '选项2', value: 'item2' },
        { text: '选项3', value: 'item3' }
    ],
    value: ''
}


export const ComponentRadio = (props: ComponentRadioProps) => {
    const { title = '单选框标题', isVertical = false, options = [], value = '' } = { ...defaultProps, ...props }
    return <div>
        <Paragraph strong>{title}</Paragraph>
        <Radio.Group value={value}>
            <Space direction={isVertical ? 'vertical' : 'horizontal'}>
                {
                    options.map(option => {
                        const { text, value } = option
                        return <Radio key={value} value={value}>
                            {text}
                        </Radio>
                    })
                }
            </Space>
        </Radio.Group>
    </div>
}