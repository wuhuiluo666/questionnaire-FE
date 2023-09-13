import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { useForm } from 'antd/es/form/Form'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfo'

const { TextArea } = Input

export const PageSetting = () => {
    const { title, desc, js, css } = useGetPageInfo()
    const dispatch = useDispatch()
    const [form] = useForm()
    // 变化后获取最新的值
    const handleValuesChange = () => {
        dispatch(resetPageInfo(form.getFieldsValue()))
    }
    // 设置变化后的值
    useEffect(() => {
        form.setFieldsValue({ title, desc, js, css })
    }, [title, desc, js, css])
    return <Form form={form} layout={'vertical'} initialValues={{ title, desc, js, css }} onValuesChange={handleValuesChange}>
        <Form.Item label={"页面标题"} rules={[{ required: true, message: '页面标题不能为空' }]} name={'title'}>
            <Input />
        </Form.Item>
        <Form.Item label={'页面描述'} name={'desc'}>
            <TextArea placeholder={'请输入页面描述'} />
        </Form.Item>
        <Form.Item label={'样式代码'} name={'css'}>
            <TextArea placeholder={'请输入 CSS ...'} />
        </Form.Item>
        <Form.Item label={'脚本代码'} name={'js'}>
            <TextArea placeholder={'请输入 JS ...'} />
        </Form.Item>
    </Form>
}