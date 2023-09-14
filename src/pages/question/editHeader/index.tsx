import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Input, Space, Typography, InputRef } from 'antd'
import React, { useState, ChangeEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfo'
import { useRequest } from 'ahooks'
import { EditToolBar } from '../editToolbar'
import styles from './index.module.scss'

const { Title } = Typography

const TitleEle = () => {
    const { title } = useGetPageInfo()
    const inputRef = useRef<InputRef>(null)
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    // 改变isEdit,并且聚焦Input
    const clickIcon = async () => {
        await setIsEdit(true)
        inputRef.current && inputRef.current.focus()
    }
    // 改变标题
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        dispatch(changePageTitle({ newTitle }))
    }
    if (isEdit) {
        return <Input onChange={handleChange} ref={inputRef} value={title} onBlur={() => setIsEdit(false)} onPressEnter={() => setIsEdit(false)} />
    }
    return <Space>
        <Title style={{ marginBottom: 0, fontSize: '18px', lineHeight: 1, marginTop: 0 }} level={5}>{title}</Title>
        <Button onClick={clickIcon} type={"link"} icon={<EditOutlined />}></Button>
    </Space>
}

const SaveButton = () => {
    // 需要更新的信息 pageInfo,componentList
    const { title, desc, js, css } = useGetPageInfo()
    const { componentsList } = useGetComponentsList()
    const { } = useRequest(async () => {

    }, {
        manual: true // 因为要点击所以是手动触发
    })
    return <Button>发布</Button>
}

export const EditHeader = () => {
    const nav = useNavigate()
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button onClick={() => nav(-1)} type={'link'} icon={<LeftOutlined />}>返回</Button>
                    <TitleEle />
                </Space>
            </div>
            <div className={styles.main}>
                <EditToolBar />
            </div>
            <div className={styles.right}>
                <Space>
                    <SaveButton />
                    <Button type={'primary'}>保存</Button>
                </Space>
            </div>
        </div>
    </div>
}