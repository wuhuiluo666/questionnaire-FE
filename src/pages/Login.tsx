import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const nav = useNavigate()
    return <div>
        <p>login</p>
        <button onClick={() => nav(-1)}>返回</button>
    </div>
}

export default Login