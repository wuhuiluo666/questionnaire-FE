import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentTextAreaProps } from '.'

export const TextAreaProps = (props: ComponentTextAreaProps) => {
    const { title, placeholder, onChange, isLocked } = props
    const [form] = useForm()
    const handleValuesChange = () => {
        onChange && onChange(form.getFieldsValue())
    }
    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder])
    return <Form form={form} layout={'vertical'} initialValues={{ title, placeholder }} onValuesChange={handleValuesChange} disabled={isLocked}>
        <Form.Item label={'标题'} name={'title'} rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'Placeholder'} name={'placeholder'}>
            <Input />
        </Form.Item>
    </Form>
}
