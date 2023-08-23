import { Checkbox, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect } from 'react'
import { ComponentTitleProps } from '.'

export const TitleProps = (props: ComponentTitleProps) => {
    const { text, isCenter, level, onChange } = props
    const [form] = useForm()
    useEffect(() => {
        form.setFieldsValue({
            text,
            isCenter,
            level
        })
    }, [text, level, isCenter])
    const valuesChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }
    return <Form onChange={valuesChange} initialValues={{ text, isCenter, level }} form={form} layout={'vertical'}>
        <Form.Item label={'标题内容'} name={'text'} rules={[{ required: true, message: '请输入标题内容' }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'层级'} name={'level'}>
            <Select options={[
                {
                    value: 1, text: 1
                },
                { value: 2, text: 2 },
                { value: 3, text: 3 }]}>
            </Select>
        </Form.Item>
        <Form.Item name={'isCenter'} valuePropName={'checked'}>
            <Checkbox>是否居中</Checkbox>
        </Form.Item>
    </Form>
}