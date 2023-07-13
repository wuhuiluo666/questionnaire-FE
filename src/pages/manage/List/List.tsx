import React, { useState } from 'react'
import QuestionCard from '../../../components/QuestionCard'
import styles from '../common.module.scss'

const mockList = [
    {
        _id: 'q1',
        title: '问卷1',
        isPublished: true,
        isStar: false,
        answerCount: 5,
        createdAt: '3月15日 13:23'
    },
    {
        _id: 'q2',
        title: '问卷2',
        isPublished: false,
        isStar: false,
        answerCount: 15,
        createdAt: '3月14日 13:23'
    },
    {
        _id: 'q3',
        title: '问卷3',
        isPublished: false,
        isStar: false,
        answerCount: 25,
        createdAt: '3月12日 13:23'
    },
    {
        _id: 'q4',
        title: '问卷4',
        isPublished: true,
        isStar: true,
        answerCount: 35,
        createdAt: '3月13日 13:23'
    },
]

const List = () => {
    const [questionList, setQuestionList] = useState(mockList)
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <h3>问卷列表</h3>
            </div>
            <div className={styles.right}>
                (搜索)
            </div>
        </div>
        <div>
            {/* 问卷列表 */}
            {
                questionList.length > 0 && questionList?.map(question => {
                    const { _id } = question
                    return <QuestionCard key={_id} {...question} />
                })
            }
        </div>
        <div className={styles.footer}>LoadMore... 加载更多...</div>
    </>
}

export default List