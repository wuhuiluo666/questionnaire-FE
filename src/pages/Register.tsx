import React from 'react'
import { Space, Typography, Form, Button, Input } from 'antd'
import styles from './Register.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title } = Typography

const Register = () => {
    const onFinish = (values: any) => {
        console.log('values', values)
    }
    return <div className={styles['register-container']}>
        <Space>
            <Title level={2}>
                <UserAddOutlined />
            </Title>
            <Title level={2}>
                注册新用户
            </Title>
        </Space>
        <Form onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item rules={[
                {
                    required: true,
                    message: '请输入用户名'
                }
            ]} label={'用户名'} name={'username'}>
                <Input />
            </Form.Item>
            <Form.Item rules={[
                {
                    required: true,
                    message: '请输入密码'
                }
            ]} label={'密码'} name={'password'}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: '请输入密码'
                    },
                    ({ getFieldValue }) => ({
                        validator: (_, value) => {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            } else {
                                return Promise.reject('两次输入的密码不一致')
                            }
                        }
                    })
                ]} label={'确认密码'} name={'confirmPassword'}>
                <Input.Password />
            </Form.Item>
            <Form.Item label={'昵称'} name={'nickname'}>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button style={{ width: '100%' }} type={'primary'} htmlType={'submit'}>注册</Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                <Link to={'/login'}>已有账号，去登录</Link>
            </Form.Item>
        </Form>
    </div >
}

export default Register