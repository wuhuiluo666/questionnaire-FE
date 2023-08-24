import { LeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { EditToolBar } from '../editToolbar'
import styles from './index.module.scss'


export const EditHeader = () => {
    const nav = useNavigate()
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space onClick={() => nav(-1)}>
                    <Button type={'link'} icon={<LeftOutlined />}>返回</Button>
                    <Typography.Title style={{ marginBottom: 0, fontSize: '18px', lineHeight: 1, marginTop: 0 }}>问卷标题</Typography.Title>
                </Space>
            </div>
            <div className={styles.main}>
                <EditToolBar />
            </div>
            <div className={styles.right}>
                <Space>
                    <Button>发布</Button>
                    <Button type={'primary'}>保存</Button>
                </Space>
            </div>
        </div>
    </div>
}