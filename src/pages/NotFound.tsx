import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const nav = useNavigate()
    return <Result
        title={"404"}
        status={"404"}
        subTitle={"抱歉，您访问的页面不存在"}
        extra={<Button onClick={() => nav('/manage/list')} type={"primary"}>返回首页</Button>}>
    </Result>
}

export default NotFound