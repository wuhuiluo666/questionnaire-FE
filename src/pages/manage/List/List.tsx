import React from 'react'
import QuestionCard from '../../../components/QuestionCard'
import { Spin, Typography } from 'antd'
import styles from '../common.module.scss'
import { useRequest, useTitle } from 'ahooks'
import InputSearch from '../../../components/InputSearch/InputSearch'
import { getQuestionList } from '../../../services/question'

const { Title } = Typography

const List = () => {
    useTitle("问卷系统-列表")
    const { loading, error, data = {} } = useRequest(getQuestionList)
    const { list = [], total } = data
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title style={{ margin: '0 0' }} level={3}>问卷列表</Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div>
        <div>
            {/* 问卷列表 */}
            {loading && (<Spin style={{ margin: '0 auto'}} />)}
            {
                (!loading && list.length > 0) && list.map((item: any) => {
                    return <QuestionCard {...item} />
                })
            }
        </div>
        <div className={styles.footer}>LoadMore... 加载更多...</div>
    </>
}

export default List