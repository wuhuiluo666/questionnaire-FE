import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentInfoProps } from '.'

const { TextArea } = Input

export const InfoProps = (props: ComponentInfoProps) => {
    const { title, desc, isLocked, onChange } = props
    const [form] = useForm()
    const onValuesChange = () => {
        onChange && onChange(form.getFieldsValue())
    }
    useEffect(() => {
        form.setFieldsValue({ title, desc })
    }, [title, desc])
    return <Form layout={'vertical'} initialValues={{ title, desc }} form={form} disabled={isLocked} onValuesChange={onValuesChange}>
        <Form.Item label={'问卷标题'} name={'title'} rules={[{ required: true, message: '请输入问卷标题' }]}>
            <Input />
        </Form.Item>
        <Form.Item label={'问卷描述'} name={'desc'}>
            <TextArea style={{ height: '150px' }} />
        </Form.Item>
    </Form>
}