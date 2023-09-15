import { LeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import styles from './header.module.scss'


export const StaticHeader = () => {
    const { title } = useGetPageInfo()
    const nav = useNavigate()
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type={'link'} icon={<LeftOutlined />} onClick={() => nav(-1)}>
                        返回
                    </Button>
                    <Typography.Title level={5}>{title}</Typography.Title>
                </Space>
            </div>
            <div className={styles.main}></div>
            <div className={styles.right}></div>
        </div>
    </div>
}