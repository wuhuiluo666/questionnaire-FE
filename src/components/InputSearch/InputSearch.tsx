import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const { Search } = Input

const InputSearch = () => {
    const [value, setValue] = useState('')
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    // 回车之后才跳转
    const handleSearch = (value: string) => {
        nav({
            pathname,
            search: `keyword=${value}`
        })
    }
    // 改变就赋值
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    // 路由变了就赋值value
    useEffect(() => {
        setValue(searchParams.get('keyword') || '')
    }, [searchParams])

    return <Search
        style={{ width: '260px' }}
        size={'large'}
        placeholder={'输入关键字'}
        value={value}
        allowClear
        onSearch={handleSearch}
        onChange={handleChange}
    />
}

export default InputSearch