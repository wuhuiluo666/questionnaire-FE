import React, { useEffect } from 'react'
import { ComponentCheckBoxProps, ListType } from '.'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

export const CheckBoxProps = (props: ComponentCheckBoxProps) => {
    const { title = '', isVertical = false, list = [], onChange, isLocked } = props
    const [form] = useForm()
    const handleValuesChange = () => {
        if (!onChange) return
        // 过滤undefined
        const newValues = form.getFieldsValue()
        if (newValues.list) {
            newValues.list = newValues.list.filter((l: ListType) => !(l.text === undefined))
        }
        const { list = [] } = newValues
        list.forEach((l: ListType) => {
            if (l.value) return
            l.value = nanoid(5)
        })
        console.log('new', newValues)
        onChange(newValues)
    }
    useEffect(() => {
        form.setFieldsValue({ title, isVertical, list })
    }, [title, isVertical, list])
    return <Form onValuesChange={handleValuesChange} disabled={isLocked} layout={'vertical'} form={form} initialValues={{ title, isVertical, list }}>
        <Form.Item label={'标题'} name={'title'} rules={[{ required: true, message: '标题不能为空' }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'选项'}>
            <Form.List name={'list'}>
                {
                    (fields, { add, remove }) => (
                        <>
                            {
                                fields.map(({ key, name }, index) => (
                                    <Space key={key} align={'baseline'}>
                                        <Form.Item name={[name, 'checked']} valuePropName={'checked'}>
                                            <Checkbox></Checkbox>
                                        </Form.Item>
                                        <Form.Item name={[name, 'text']} rules={[{ required: true, message: '请输入选项文字' }, {
                                            validator: (_, text) => {
                                                const { list = [] } = form.getFieldsValue()
                                                let num = 0
                                                list.forEach((l: { text: string, value: string, checked: boolean }) => {
                                                    if (l.text === text) num++
                                                })
                                                if (num === 1) return Promise.resolve() // 只能有一个就是他本身
                                                return Promise.reject(new Error('和其他选项重复了'))
                                            }
                                        }]}>
                                            <Input placeholder={'请输入选项文字'} />
                                        </Form.Item>
                                        {index > 0 && <MinusOutlined onClick={() => remove(name)} />}
                                    </Space>
                                ))
                            }
                            {/* 添加选项 */}
                            <Form.Item>
                                <Button block type={'link'} icon={<PlusOutlined />} onClick={() => add({ text: '', value: '', checked: false })}>
                                    添加选项
                                </Button>
                            </Form.Item>.
                        </>
                    )
                }
            </Form.List>
        </Form.Item>
        <Form.Item name={'isVertical'} valuePropName={'checked'}>
            <Checkbox>竖向排列</Checkbox>
        </Form.Item>
    </Form>
}