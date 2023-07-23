import React, { useState } from 'react'
import styles from '../common.module.scss'
import { Typography, Table, Tag, Empty, Space, Button, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useSearchList } from '../../../hooks/useSearchList'
import InputSearch from '../../../components/InputSearch/InputSearch'

const { Title } = Typography

const tableList = [
    {
        _id: 'q1',
        title: '问卷1',
        isPublished: true,
        isStar: true,
        answerCount: 5,
        createdAt: '3月15日 13:23'
    },
    {
        _id: 'q2',
        title: '问卷2',
        isPublished: false,
        isStar: true,
        answerCount: 15,
        createdAt: '3月14日 13:23'
    },
    {
        _id: 'q3',
        title: '问卷3',
        isPublished: false,
        isStar: true,
        answerCount: 25,
        createdAt: '3月12日 13:23'
    },
]

const tableColumns = [
    {
        title: '问卷名',
        dataIndex: 'title',
    },
    {
        title: '是否发布',
        dataIndex: 'isPublished',
        render: (isPublished: boolean) => isPublished ? <Tag color={'processing'}>已发布</Tag> : <Tag>未发布</Tag>
    },
    {
        title: '问卷数量',
        dataIndex: 'answerCount'
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt'
    }
]

const Trash = () => {
    const { list, total, loading, error } = useSearchList(false, true)
    const [selectKeys, setSelectKeys] = useState<string[]>([])
    const deleteArray = () => {
        Modal.confirm({
            title: '确定彻底删除该问卷?',
            content: '删除以后无法找回',
            icon: <ExclamationCircleOutlined />,
            onOk: () => alert(JSON.stringify(selectKeys))
        })
    }
    const TableElement = (
        <>
            <Space>
                <Button type={'primary'} size={'large'} disabled={selectKeys.length === 0}>恢复</Button>
                <Button onClick={deleteArray} type={'default'} size={'large'} danger disabled={selectKeys.length === 0}>彻底删除</Button>
            </Space>
            <Table
                rowSelection={{ type: 'checkbox', onChange: (selectedRowKeys) => setSelectKeys(selectedRowKeys as string[]) }}
                rowKey={(q: any) => q._id}
                pagination={false}
                dataSource={list}
                columns={tableColumns} /></>
    )

    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>回收站</Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div>
        <div>
            {loading && <Spin size={'large'} style={{ position: 'absolute', left: '50%', top: '50%' }} />}
            {
                (!loading && list.length > 0)  && TableElement
            }
        </div>
    </>
}

export default Trash