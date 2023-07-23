import React from 'react'
import styles from '../common.module.scss'
import { Spin, Typography } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
import { useSearchList } from '../../../hooks/useSearchList'
import InputSearch from '../../../components/InputSearch/InputSearch'

const { Title } = Typography


const Star = () => {
    const { list, total, loading, error } = useSearchList(true)
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div>
        <div>
            {
                loading && <Spin size={'large'} style={{ position: 'absolute', top: '50%', left: '50%' }} />
            }
            {
                (!loading && list.length > 0) && list.map((q: any) => (
                    <QuestionCard key={q._id} {...q} />
                ))
            }
        </div>
        <div className={styles.footer}>我是分页</div>
    </>
}

export default Star