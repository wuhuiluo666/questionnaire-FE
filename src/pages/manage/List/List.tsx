import React, { useEffect, useMemo, useState } from 'react'
import QuestionCard from '../../../components/QuestionCard'
import { Empty, Spin, Typography } from 'antd'
import styles from '../common.module.scss'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import InputSearch from '../../../components/InputSearch/InputSearch'
import { useSearchParams } from 'react-router-dom'
import { getQuestionList } from '../../../services/question'

const PAGE_SIZE = 10
const { Title } = Typography

const List = () => {
    useTitle("问卷系统-列表")
    const [started, setStarted] = useState(true)
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const hasMore = page <= Math.round(total / PAGE_SIZE)
    const keyword = searchParams.get('keyword') || ''
    const { run: getList, loading } = useRequest(async () => {
        const data = await getQuestionList({
            page,
            pageSize: PAGE_SIZE,
            keyword: searchParams.get('keyword') || ''
        })
        return data
    }, {
        manual: true,
        onSuccess: (result) => {
            const { list: resultList = [], total = 0 } = result
            setList(list.concat(resultList))
            setTotal(total)
            setPage(page + 1)
        }
    })
    const { run: debounceLoadMore } = useDebounceFn(() => {
        // 文档区域高度
        const showHeight = window.innerHeight
        // 页面卷曲高度
        const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
        // 所有内容高度
        const allHeight = document.body.scrollHeight
        if (allHeight <= showHeight + scrollTopHeight) {
            getList()
            setStarted(false)
        }
    }, {
        wait: 500
    })
    // 首次加载或者searchParams变化
    useEffect(() => {
        debounceLoadMore()
    }, [searchParams])

    // keyword改变
    useEffect(() => {
        setStarted(true)
        setList([])
        setPage(1)
        setTotal(0)
    }, [keyword])

    // 首次加载或者searchParam变化
    useEffect(() => {
        if (hasMore) {
            window.addEventListener('scroll', debounceLoadMore)
        }
        return () => {
            window.removeEventListener('scroll', debounceLoadMore)
        }
    }, [page])
    const loadMoreElement = () => {
        if (started || loading) return <Spin />
        if (total === 0) return <Empty description={'暂无数据'} />
        if (!hasMore) return <div>没有更多数据了...</div>
        return <div>
            加载更多
        </div>
    }
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
            {
                (list.length > 0) && list?.map((item: any) => {
                    return <QuestionCard key={item._id} {...item} />
                })
            }
        </div>
        <div className={styles.footer}>
            {loadMoreElement()}
        </div>
    </>
}

export default List