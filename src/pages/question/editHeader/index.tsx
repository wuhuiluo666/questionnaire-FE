import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Input, Space, Typography, InputRef, message } from 'antd'
import React, { useState, ChangeEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfo'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { EditToolBar } from '../editToolbar'
import styles from './index.module.scss'
import { changeQuestionStar } from '../../../services/question'

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
    const { id } = useParams()
    // 需要更新的信息 pageInfo,componentList
    const { title, desc, js, css } = useGetPageInfo()
    const { componentsList } = useGetComponentsList()
    const { loading, run: save } = useRequest(async () => {
        if (id) {
            await changeQuestionStar(id, { componentsList, title, desc, js, css })
        }
    }, {
        manual: true // 因为要点击所以是手动触发
    })
    useKeyPress(['ctrl.s'], (event: KeyboardEvent) => {
        // 阻止页面默认行为
        event.preventDefault()
        // 如果在加载就不触发,没有加载才触发
        if (!loading) save()
    })
    // 防抖
    useDebounceEffect(() => {
        save()
    }, [title, desc, js, css, componentsList], { wait: 100 })
    return <Button onClick={save} icon={loading ? <LoadingOutlined /> : null} disabled={loading}>保存</Button>
}

const PublishButton = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const { title, desc, js, css } = useGetPageInfo()
    const { componentsList } = useGetComponentsList()
    const { loading, run: Publish } = useRequest(async () => {
        if (!id) return
        await changeQuestionStar(id, { title, desc, js, css, componentsList, isPublished: true })
    }, {
        manual: true,
        onSuccess: () => {
            message.success('发布成功')
            nav(`/question/static/${id}`)
        }
    })
    return <Button onClick={Publish} loading={loading} disabled={loading} type={'primary'}>发布</Button>
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
                    <PublishButton />
                </Space>
            </div>
        </div>
    </div>
}