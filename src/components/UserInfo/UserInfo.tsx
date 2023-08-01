import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserInfo } from '../../services/user'
import { TokenKey } from '../../utils/token'

const UserInfo = () => {
    const nav = useNavigate()
    const { data = {} } = useRequest(getUserInfo)
    const { userName = '', nickName = '' } = data
    const logout = () => {
        window.localStorage.removeItem(TokenKey)
        nav('/login')
    }
    const loginScreen = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserOutlined style={{ color: '#e8e8e8' }} />
            <p style={{ color: '#e8e8e8' }}>
                {nickName}
            </p>
            <Button onClick={logout} type={"link"}>退出</Button>
        </div>
    )
    const unLoginScreen = (
        <>
            <Link to={'/login'}>登陆</Link>
        </>
    )
    return <>
        {userName ? loginScreen : unLoginScreen}
    </>
}

export default UserInfo