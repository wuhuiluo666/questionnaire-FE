import React, { useState } from 'react'
import styles from './QuestionCard.module.scss'
import { changeQuestionStar, copyQuestion } from '../../src/services/question'
import { useRequest } from 'ahooks'
import { Space, Button, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'


interface QuestionCard {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createdAt: string
}

const QuestionCard = (props: QuestionCard) => {
    const nav = useNavigate()
    const [isDeleted, setIsDeleted] = useState(false)
    const { _id, title, isPublished, isStar, answerCount, createdAt } = props
    const [starState, setStarState] = useState(isStar)
    // 标星
    const { run: changeStar, loading: changeStarLoading } = useRequest(async () => {
        await changeQuestionStar(_id, {
            isStar: !starState
        })
    }, {
        manual: true,
        onSuccess: () => {
            setStarState(!starState)
            message.success('修改成功')
        }
    })
    // 删除问卷
    const { run: deleteQuestion, loading: deleteLoading } = useRequest(async () => {
        await changeQuestionStar(_id, {
            isDeleted: true
        })
    }, {
        manual: true,
        onSuccess: () => {
            setIsDeleted(true)
            message.success('删除成功')
        }
    })
    const deleteConfirm = () => {
        Modal.confirm({
            title: '确认要删除问卷吗?',
            icon: <ExclamationCircleOutlined />,
            onOk: deleteQuestion
        })
    }
    // 复制
    const { run: copy, loading: copyLoading } = useRequest(async () => await copyQuestion(_id), {
        manual: true,
        onSuccess: (result) => {
            nav(`/question/edit/${result.id}`)
            message.success("复制成功")
        }
    })
    if (isDeleted) return null
    return <div className={styles.container}>
        <div className={styles.title}>
            <div className={styles.left}>
                {/* 已发布跳统计 未发布跳编辑 */}
                <Link to={isPublished ? `/question/static/${_id}` : `/question/edit/${_id}`}>
                    <Space>
                        {starState && <StarOutlined style={{ color: 'red' }} />}
                        {title}
                    </Space>
                </Link>
            </div>
            <div className={styles.right}>
                <Space>
                    {isPublished ? <Tag color={'processing'}>已发布</Tag> : <Tag>未发布</Tag>}
                    <span>问卷: {answerCount}</span>
                    <span>{createdAt}</span>
                </Space>
            </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles['button-container']}>
            <div className={styles.left}>
                <Space>
                    <Button onClick={() => nav(`/question/edit/${_id}`)} icon={<EditOutlined />} type={'default'} size={'small'}>编辑问卷</Button>
                    <Button
                        onClick={() => nav(`/question/static/${_id}`)}
                        disabled={!isPublished}
                        icon={<LineChartOutlined />}
                        type={'default'} size={'small'}>数据统计</Button>
                </Space>
            </div>
            <div className={styles.right}>
                <Space>
                    <Button disabled={changeStarLoading} onClick={changeStar} icon={<StarOutlined />} size={'small'} type={'text'}>
                        {starState ? '取消标星' : '标星'}
                    </Button>
                    <Popconfirm
                        title={'确定要复制问卷吗?'}
                        okText={'确定'}
                        cancelText={'取消'}
                        onConfirm={copy}
                    >
                        <Button disabled={copyLoading} icon={<CopyOutlined />} size={'small'} type={'text'}>
                            复制
                        </Button>
                    </Popconfirm>
                    <Button disabled={deleteLoading} onClick={deleteConfirm} icon={<DeleteOutlined />} size={'small'} type={'text'}>删除</Button>
                </Space>
            </div>
        </div>
    </div>
}

export default QuestionCard