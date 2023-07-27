import React, { useEffect, useState } from 'react'
import QuestionCard from '../../../components/QuestionCard'
import { Spin, Typography } from 'antd'
import styles from '../common.module.scss'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import InputSearch from '../../../components/InputSearch/InputSearch'
import { useSearchParams } from 'react-router-dom'
import { getQuestionList } from '../../../services/question'

const PAGE_SIZE = 10
const { Title } = Typography

const List = () => {
    useTitle("问卷系统-列表")
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const { } = useRequest(async () => {
        const data = await getQuestionList({
            page,
            pageSize: PAGE_SIZE,
            keyword: searchParams.get('keyword') || ''
        })
    })
    const { run: loadMoreData } = useDebounceFn(() => {
        // 文档区域高度
        const showHeight = window.innerHeight
        // 页面卷曲高度
        const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
        // 所有内容高度
        const allHeight = document.body.scrollHeight
        if (allHeight <= showHeight + scrollTopHeight) {
            console.log('到底了')
        }
    }, {
        wait: 5000
    })
    useEffect(() => {
        loadMoreData()
    }, [searchParams])

    // 首次加载或者searchParam变化
    useEffect(() => {
        window.addEventListener('scroll', () => {
            loadMoreData()
        })
        return () => {
            window.removeEventListener('scroll', () => {
                console.log('revmove')
            })
        }
    }, [])
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title style={{ margin: '0 0' }} level={3}>问卷列表</Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div>
        <div style={{ height: '100px' }}>
            {/* 问卷列表 */}
            {/* {loading && (<Spin size={'large'} style={{ position: 'absolute', top: '50%', left: '50%' }} />)}
            {
                (!loading && list.length > 0) && list?.map((item: any) => {
                    return <QuestionCard key={item._id} {...item} />
                })
            } */}
        </div>
        <div className={styles.footer}>
            <div>LoadMore... 加载更多...</div>
        </div>
    </>
}

export default List