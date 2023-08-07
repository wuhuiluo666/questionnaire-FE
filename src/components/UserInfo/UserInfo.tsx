import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { logoutReducer } from '../../store/user' 
import { TokenKey } from '../../utils/token'
import { UserType } from '../../store/user'

const UserInfo = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { nickName, userName } = useSelector<{
        user: UserType
    }>(state => state.user) as UserType
    const logout = () => {
        dispatch(logoutReducer)
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