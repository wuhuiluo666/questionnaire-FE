import React, { useEffect } from 'react'
import axios from 'axios'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'

const Home = () => {
    const nav = useNavigate()
    useEffect(() => {
        axios.get('/api/test').then(res => console.log('res', res))
    }, [])
    return <div className={styles.container}>
        <div className={styles.info}>
            <Typography.Title>问卷调查 | 在线投票</Typography.Title>
            <Typography.Paragraph>已累计创建问卷 x 份，发布问卷 x 份，收到答卷 x份</Typography.Paragraph>
            <div>
                <Button type={'primary'} onClick={() => nav('/manage/list')}>开始使用</Button>
            </div>
        </div>
    </div>
}

export default Home