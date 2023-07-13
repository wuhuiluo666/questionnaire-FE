import React from 'react'
import styles from './QuestionCard.module.scss'
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
    const { _id, title, isPublished, isStar, answerCount, createdAt } = props
    const deleteConfirm = () => {
        Modal.confirm({
            title: '确认要删除问卷吗?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => message.success('删除成功')
        })
    }
    const confirm = () => {
        message.success('复制成功')
    }
    return <div className={styles.container}>
        <div className={styles.title}>
            <div className={styles.left}>
                {/* 已发布跳统计 未发布跳编辑 */}
                <Link to={isPublished ? `/question/static/${_id}` : `/question/edit/${_id}`}>
                    <Space>
                        {isStar && <StarOutlined style={{ color: 'red' }} />}
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
                    <Button icon={<StarOutlined />} size={'small'} type={'text'}>
                        {isStar ? '取消标星' : '标星'}
                    </Button>
                    <Popconfirm
                        title={'确定要复制问卷吗?'}
                        okText={'确定'}
                        cancelText={'取消'}
                        onConfirm={confirm}
                    >
                        <Button icon={<CopyOutlined />} size={'small'} type={'text'}>
                            复制
                        </Button>
                    </Popconfirm>
                    <Button onClick={deleteConfirm} icon={<DeleteOutlined />} size={'small'} type={'text'}>删除</Button>
                </Space>
            </div>
        </div>
    </div>
}

export default QuestionCard