import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentRadioProps } from '.'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

export const RadioProps = (props: ComponentRadioProps) => {
    const { title, isVertical, options, value, onChange, isLocked } = props
    const [form] = useForm()
    useEffect(() => {

    })
    return <Form layout={'vertical'} initialValues={{ title, isVertical, options, value }} form={form} disabled={isLocked}>
        <Form.Item label={'标题'} name={'title'} rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'选项'}>
            <Form.List name={'options'}>
                {(fileds, { add, remove }) => (
                    <>
                        {fileds.map(({ key, name }, index) => {
                            return <Space key={key} align={'baseline'}>
                                {/* 当前选项输入框 */}
                                {/* 这里可以遍历出 text属性下所有的值 */}
                                <Form.Item name={[name, 'text']} rules={[{ required: true, message: '请输入选项文字' }]}>
                                    <Input placeholder={'输入选项文字...'} />
                                </Form.Item>
                                {/* 当前选项 删除按钮 */}
                                {index > 0 && <MinusOutlined onClick={() => remove(name)} />}
                            </Space>
                        })}
                        {/* 添加选项 */}
                        <Form.Item>
                            <Button icon={<PlusOutlined />} block type={'link'} onClick={() => add({ text: '', value: '' })}>
                                添加选项
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form.Item>
        <Form.Item name={'isVertical'} valuePropName={"checked"}>
            <Checkbox>竖向排列</Checkbox>
        </Form.Item>
    </Form>
}