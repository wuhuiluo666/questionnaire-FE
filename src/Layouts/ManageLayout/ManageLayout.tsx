import React from 'react'
import styles from './ManageLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Button, Divider, message, Space } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { createNewQuestion } from '../../services/question'
import { useRequest } from 'ahooks'

const ManageLayout = () => {
    const { pathname } = useLocation()
    const nav = useNavigate()
    const { run: createQuestion, loading, error } = useRequest(createNewQuestion, {
        manual: true,
        onSuccess: (result) => {
            nav(`/question/edit/${result.id}`)
            message.success('创建成功')
        }
    })
    return <div className={styles.container}>
        <div className={styles.left}>
            <Space direction={'vertical'}>
                <Button disabled={loading} onClick={createQuestion} icon={<PlusOutlined />} size={'large'} type={'default'}>创建问卷</Button>
                <Divider />
                <Button icon={<BarsOutlined />} onClick={() => nav('/manage/list')} size={'large'} type={pathname.startsWith('/manage/list') ? 'primary' : 'default'}>我的问卷</Button>
                <Button icon={<StarOutlined />} onClick={() => nav('/manage/star')} size={'large'} type={pathname.startsWith('/manage/star') ? 'primary' : 'default'}>星标问卷</Button>
                <Button icon={<DeleteOutlined />} onClick={() => nav('/manage/trash')} size={'large'} type={pathname.startsWith('/manage/trash') ? 'primary' : 'default'}>回收站</Button>
            </Space>
        </div>
        <div className={styles.right}>
            <Outlet />
        </div>
    </div>
}

export default ManageLayout