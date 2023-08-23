import { LeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React from 'react'
import styles from './index.module.scss'


export const EditHeader = () => {
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type={'link'} icon={<LeftOutlined />}>返回</Button>
                    <Typography.Title style={{ marginBottom: 0, fontSize: '18px', lineHeight: 1, marginTop: 0 }}>问卷标题</Typography.Title>
                </Space>
            </div>
            <div className={styles.main}>M</div>
            <div className={styles.right}>
                <Space>
                    <Button>保存</Button>
                    <Button>发布</Button>
                </Space>
            </div>
        </div>
    </div>
}