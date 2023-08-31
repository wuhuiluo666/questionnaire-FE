import React, { useEffect } from 'react'
import { Checkbox, Form, Input } from 'antd'
import { ComponentParagraphProps } from '.'
import { useForm } from 'antd/es/form/Form'

const { TextArea } = Input

export const ParagraphProps = (props: ComponentParagraphProps) => {
    const { text, isCenter, onChange, isLocked } = props
    const [form] = useForm()
    const handleValuesChange = () => {
        onChange && onChange(form.getFieldsValue())
    }
    useEffect(() => {
        form.setFieldsValue({ text, isCenter })
    }, [text, isCenter])
    return <Form disabled={isLocked} form={form} layout={'vertical'} initialValues={{ text, isCenter }} onValuesChange={handleValuesChange}>
        <Form.Item label={'段落内容'} name={'text'} rules={[{ required: true, message: '请输入段落内容' }]}>
            <TextArea style={{ height: '150px' }}></TextArea>
        </Form.Item>
        <Form.Item name={'isCenter'} valuePropName='checked'>
            <Checkbox>居中显示</Checkbox>
        </Form.Item>
    </Form>
}