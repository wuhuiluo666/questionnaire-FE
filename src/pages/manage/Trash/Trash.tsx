import React, { useState } from 'react'
import styles from '../common.module.scss'
import { Typography, Table, Tag, Empty, Space, Button, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useSearchList } from '../../../hooks/useSearchList'
import InputSearch from '../../../components/InputSearch/InputSearch'
import { ListPagination } from '../../../components/ListPagination/ListPagination'
import { useRequest } from 'ahooks'
import { changeQuestionStar, deleteQuestion } from '../../../services/question'

const { Title } = Typography

const tableColumns = [
    {
        title: '问卷名',
        dataIndex: 'title',
    },
    {
        title: '是否发布',
        dataIndex: 'isPublished',
        render: (isPublished: boolean) => isPublished ? <Tag color={'processing'}>已发布</Tag> : <Tag>未发布</Tag>
    },
    {
        title: '问卷数量',
        dataIndex: 'answerCount'
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt'
    }
]

const Trash = () => {
    const { list, total, loading, refresh } = useSearchList(false, true)
    const [selectKeys, setSelectKeys] = useState<string[]>([])
    // 恢复操作
    const { run: reCover } = useRequest(async () => {
        for await (const id of selectKeys) {
            await changeQuestionStar(id, {
                isDeleted: false
            })
        }
    }, {
        manual: true,
        debounceWait: 500,
        onSuccess: () => {
            message.success('恢复成功')
            refresh()
            setSelectKeys([])
        }
    })
    const { run: deleteKeys } = useRequest(async () => {
        await deleteQuestion(selectKeys)
    }, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功')
            refresh()
            setSelectKeys([])
        }
    })
    const deleteArray = () => {
        Modal.confirm({
            title: '确定彻底删除该问卷?',
            content: '删除以后无法找回',
            icon: <ExclamationCircleOutlined />,
            onOk: () => deleteKeys
        })
    }
    const TableElement = (
        <>
            <Space>
                <Button onClick={reCover} type={'primary'} size={'large'} disabled={selectKeys.length === 0}>恢复</Button>
                <Button onClick={deleteArray} type={'default'} size={'large'} danger disabled={selectKeys.length === 0}>彻底删除</Button>
            </Space>
            <Table
                rowSelection={{ type: 'checkbox', onChange: (selectedRowKeys) => setSelectKeys(selectedRowKeys as string[]) }}
                rowKey={(q: any) => q._id}
                pagination={false}
                dataSource={list}
                columns={tableColumns} /></>
    )

    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>回收站</Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div>
        <div>
            {loading && <Spin size={'large'} style={{ position: 'absolute', left: '50%', top: '50%' }} />}
            {
                (!loading && list.length > 0) && TableElement
            }
        </div>
        {
            !loading && <div>
                <ListPagination total={total} />
            </div>
        }
    </>
}

export default Trash