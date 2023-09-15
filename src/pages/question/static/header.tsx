import React from 'react'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import styles from './header.module.scss'


export const StaticHeader = () => {
    const { id } = useParams()
    const { title } = useGetPageInfo()
    const nav = useNavigate()
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type={'link'} icon={<LeftOutlined />} onClick={() => nav(-1)}>
                        返回
                    </Button>
                    <Typography.Title style={{ marginTop: 0 }} level={5}>{title}</Typography.Title>
                </Space>
            </div>
            <div className={styles.main}>123</div>
            <div className={styles.right}>
                <Button onClick={() => nav(`/question/edit/${id}`)} type={'primary'} icon={<EditOutlined />}>
                    编辑问卷
                </Button>
            </div>
        </div>
    </div>
}