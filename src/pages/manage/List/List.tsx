import React from 'react'
import QuestionCard from '../../../components/QuestionCard'
import { Spin, Typography } from 'antd'
import styles from '../common.module.scss'
import { useTitle } from 'ahooks'
import InputSearch from '../../../components/InputSearch/InputSearch'
import { useSearchList } from '../../../hooks/useSearchList'
import { ListPagination } from '../../../components/ListPagination/ListPagination'

const { Title } = Typography

const List = () => {
    useTitle("问卷系统-列表")
    const { list = [], total, loading, error } = useSearchList()
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
            {loading && (<Spin size={'large'} style={{ position: 'absolute', top: '50%', left: '50%' }} />)}
            {
                (!loading && list.length > 0) && list?.map((item: any) => {
                    return <QuestionCard key={item._id} {...item} />
                })
            }
        </div>
        {
            !loading && <div>
                <ListPagination total={total} />
            </div>
        }
        {!loading && <div className={styles.footer}>LoadMore... 加载更多...</div>}
    </>
}

export default List