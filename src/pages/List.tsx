import React, { useState } from 'react'
import styles from './List.module.scss'

const mockList = [
    {
        id: 'q1',
        title: '问卷1',
        isPublished: false,
        isStar: false,
        answerCount: 5,
        createAt: '3月10日 13:23'
    },
    {
        id: 'q2',
        title: '问卷2',
        isPublished: false,
        isStar: false,
        answerCount: 5,
        createAt: '3月10日 13:23'
    },
    {
        id: 'q3',
        title: '问卷3',
        isPublished: false,
        isStar: false,
        answerCount: 5,
        createAt: '3月10日 13:23'
    },
    {
        id: 'q4',
        title: '问卷4',
        isPublished: false,
        isStar: false,
        answerCount: 5,
        createAt: '3月10日 13:23'
    },
]

const List: React.FC = () => {
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
        <div className={styles.content}>content</div>
        <div className={styles.footer}>footer</div>
    </>
}

export default List