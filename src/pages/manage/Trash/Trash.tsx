import React, { useState } from 'react'
import styles from '../common.module.scss'
import { Typography, Table, Tag, Empty } from 'antd'

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
    const [tableArray, setTableArray] = useState(tableList)
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>回收站</Title>
            </div>
            <div className={styles.right}>
                搜索()
            </div>
        </div>
        <div>
            {
                tableArray.length > 0 ? <Table rowKey={q => q._id} pagination={false} dataSource={tableArray} columns={tableColumns} /> : <Empty description={'暂无数据'} />
            }
        </div>
    </>
}

export default Trash