import React, { useEffect } from 'react'
import { Button, Checkbox, Input, message, Space, Typography } from 'antd'
import styles from './Login.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LoginUser } from '../services/user'
import { setToken } from '../utils/token'

const { Title } = Typography
const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

const rememberUser = (username: string, password: string) => {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
}

const deleteUser = () => {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}

const getUserInfo = () => (
    {
        username: localStorage.getItem(USERNAME_KEY),
        password: localStorage.getItem(PASSWORD_KEY)
    }
)

const Login = () => {
    const nav = useNavigate()
    const [form] = Form.useForm()
    const { run } = useRequest(async (values) => {
        const { username, password } = values
        return await LoginUser({
            username,
            password
        })
    }, {
        manual: true,
        onSuccess: (result) => {
            const { token = '' } = result
            setToken(token)
            message.success('登录成功')
            nav('/manage/list')
        }
    })
    const onFinish = (values: any) => {
        nav('/manage/list')
        // const { username, password, remember } = values
        // run(values)
        // if (remember) {
        //     rememberUser(username, password)
        // } else {
        //     deleteUser()
        // }
    }
    useEffect(() => {
        const { username, password } = getUserInfo()
        form.setFieldsValue({
            username,
            password
        })
    }, [])
    return <div className={styles['login-container']}>
        <Space>
            <Title>
                <UserAddOutlined />
            </Title>
            <Title>
                用户登录
            </Title>
        </Space>
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
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
            <Form.Item name={'remember'} valuePropName={'checked'} wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType={'submit'} type={'primary'}>登录</Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Link to={'/reigster'}>还没有账号呢？去注册~</Link>
            </Form.Item>
        </Form>
    </div>
}

export default Login
