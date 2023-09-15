import React from 'react'
import { Result, Spin, Button } from 'antd'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { useGetQuestionDetail } from '../../../hooks/useLoadQuestionData'
import { useNavigate } from 'react-router-dom'


const Static = () => {
    const { loading } = useGetQuestionDetail()
    const { title, isPublished } = useGetPageInfo()
    const nav = useNavigate()
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <Spin />
            </div>
        )
    }
    // 未发布
    // if (!isPublished) {
    //     return <Result status={'warning'} title={'问卷暂未发布'} extra={<Button type={'primary'} onClick={() => nav(-1)}>返回上一页</Button>}>
    //     </Result>
    // }
    return <>
        Static
    </>
}

export default Static