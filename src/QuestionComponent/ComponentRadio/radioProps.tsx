import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ComponentRadioProps } from '.'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

export const RadioProps = (props: ComponentRadioProps) => {
    const { title, isVertical, options, value, onChange, isLocked } = props
    const [form] = useForm()
    useEffect(() => {
        form.setFieldsValue({ title, isVertical, options, value })
    }, [title, isVertical, value, options])
    const handleValuesChange = () => {
        if (!onChange) return
        // 出发onChange函数
        const newValues = form.getFieldsValue() as ComponentRadioProps
        if (newValues.options) {
            // 需要清除 text 为 undefined的选项
            newValues.options = newValues.options.filter(opt => opt.text.length !== null)
        }
        const { options = [] } = newValues
        options.forEach(opt => {
            if (opt.value) return
            opt.value = nanoid(5) // 补齐 opt value
        })
        onChange(newValues)
    }
    return <Form onValuesChange={handleValuesChange} layout={'vertical'} initialValues={{ title, isVertical, options, value }} form={form} disabled={isLocked}>
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
                                <Form.Item name={[name, 'text']} rules={[{ required: true, message: '请输入选项文字' }, {
                                    validator: (_, text) => {
                                        const { options = [] } = form.getFieldsValue()
                                        let num = 0
                                        options.forEach((opt: { text: string, value: string }) => {
                                            if (opt.text === text) num++ // 记录text相同的个数，预期只有一个(自己)
                                        })
                                        if (num === 1) return Promise.resolve()
                                        return Promise.reject(new Error('和其他选项重复了'))
                                    }
                                }]}>
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
        <Form.Item label={'默认选中'} name={'value'}>
            <Select value={value} options={options?.map(({ text, value }) => ({ label: text || '', value }))}></Select>
        </Form.Item>
        <Form.Item name={'isVertical'} valuePropName={"checked"}>
            <Checkbox>竖向排列</Checkbox>
        </Form.Item>
    </Form >
}