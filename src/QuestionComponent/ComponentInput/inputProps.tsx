import React, { useEffect } from 'react'
import { ComponentInputProps } from '.'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'

// Input的属性
export const InputProps = (props: ComponentInputProps) => {
    const [form] = useForm()
    const { title, placeholder, onChange, isLocked } = props

    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder])
    const valuesChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }
    return <Form disabled={isLocked} form={form} onValuesChange={valuesChange} layout={'vertical'} initialValues={{ title, placeholder }}>
        <Form.Item rules={[{ required: true, message: '请输入标题' }]} label="标题" name={'title'}>
            <Input />
        </Form.Item>
        <Form.Item label={'Placeholder'} name={'placeholder'}>
            <Input />
        </Form.Item>
    </Form>
}