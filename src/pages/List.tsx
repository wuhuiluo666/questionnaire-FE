import React, { useState } from 'react'


const List: React.FC = () => {
    const [questionList, setQuestionList] = useState([
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
    ])
    return <>
        List
    </>
}

export default List