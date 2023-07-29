import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

interface PaginationType {
    total: number
}

export const ListPagination = ({ total }: PaginationType) => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)

    useEffect(() => {
        setCurrent(parseInt(searchParams.get('page') || '') || 1)
        setPageSize(parseInt(searchParams.get('pageSize') || '') || 10)
    }, [searchParams])

    const changePagination = (page: number, pageSize: number) => {
        searchParams.set('page', page.toString())
        searchParams.set('pageSize', pageSize.toString())
        nav({
            pathname,
            search: searchParams.toString()
        })
    }

    return <Pagination onChange={changePagination} current={current} pageSize={pageSize} total={total} />
}