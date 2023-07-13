import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import styles from './Home.module.scss'

const Home = () => {
    const nav = useNavigate()
    return <div className={styles.container}>
        <div className={styles.info}>
            <Typography.Title>问卷调查 | 在线投票</Typography.Title>
            <Typography.Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980份</Typography.Paragraph>
            <div>
                <Button type={'primary'} onClick={() => nav('/manage/list')}>开始使用</Button>
            </div>
        </div>
    </div>
}

export default Home