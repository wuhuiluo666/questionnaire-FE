import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'antd'

const Home = () => {
    const nav = useNavigate()
    const login = () => {
        nav('/login')
    }
    return <div>
        <p>Home</p>
        <Button>按钮</Button>
        <div>
            <button onClick={login}>登录</button>
            <Link to={'/register?a=20'}>注册</Link>
        </div>
    </div>
}

export default Home