import React from 'react'
import { Space, Typography, Form, Button, Input } from 'antd'
import styles from './Register.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title } = Typography

const Register = () => {
    return <div className={styles['register-container']}>
        <Space>
            <Title level={2}>
                <UserAddOutlined />
            </Title>
            <Title level={2}>
                注册新用户
            </Title>
        </Space>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label={'用户名'} name={'username'}>
                <Input />
            </Form.Item>
            <Form.Item label={'密码'} name={'password'}>
                <Input.Password />
            </Form.Item>
            <Form.Item label={'确认密码'} name={'confirmPassword'}>
                <Input.Password />
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