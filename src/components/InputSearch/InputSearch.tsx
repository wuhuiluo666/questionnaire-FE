import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'

const { Search } = Input

const InputSearch = () => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [value, setValue] = useState('')
    const [searchParams] = useSearchParams()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const handleSearch = (value: string) => {
        console.log(pathname)
        nav({
            pathname,
            search: `keyword=${value}`
        })
    }
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