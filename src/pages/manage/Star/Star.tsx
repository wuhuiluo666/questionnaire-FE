import React, { useState } from 'react'
import styles from '../common.module.scss'
import { Empty, Typography } from 'antd'
import QuestionCard from '../../../components/QuestionCard'

const { Title } = Typography

const mockList = [
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

const Star = () => {
    const [starList, setStarList] = useState(mockList)
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
            </div>
            <div className={styles.right}>
                搜索()
            </div>
        </div>
        <div>
            {
                starList.length > 0 ? starList.map(star => {
                    const { _id } = star
                    return <QuestionCard key={_id} {...star} />
                }) : <Empty description={"暂无数据"} />
            }
        </div>
        <div className={styles.footer}>我是分页</div>
    </>
}

export default Star