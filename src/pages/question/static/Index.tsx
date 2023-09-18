import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Result, Spin, Button, Table, Typography } from 'antd'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { useGetQuestionDetail } from '../../../hooks/useLoadQuestionData'
import { useNavigate, useParams } from 'react-router-dom'
import { StaticHeader } from './header'
import styles from './index.module.scss'
import { ComponentList } from '../../../components/ComponentList.tsx'
import { useRequest } from 'ahooks'
import { getStaticListService } from '../../../services/static'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'


const Static = () => {
    const { id = '' } = useParams()
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const { componentsList } = useGetComponentsList()
    const { loading: loadingTb } = useRequest(async () => {
        const data = await getStaticListService(id, { page: 1, pageSize: 10 })
        return data
    },
        {
            onSuccess: (data) => {
                const { list = [], total = 0 } = data
                setList(list)
                setTotal(total)
            }
        }
    )
    const [selectedComponentId, setSelectedComponentId] = useState('')
    const { loading } = useGetQuestionDetail()
    const { title, isPublished } = useGetPageInfo()
    const nav = useNavigate()
    const LoadingElement = (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Spin />
        </div>
    )
    const columns = componentsList.map(c => {
        const { fe_id } = c
        return {
            dataIndex: fe_id,
            title: (
                <span key={fe_id} onClick={() => setSelectedComponentId(fe_id)} style={{ cursor: 'pointer', color: selectedComponentId === fe_id ? '#1890ff' : '' }}>
                    {c.title}
                </span>
            )
        }
    })
    console.log('columns', columns)
    console.log('list', list)
    const genContentElement = () => {
        // 未发布
        // if (typeof isPublished === 'boolean' && !isPublished) {
        //     return <Result style={{ margin: '0 auto' }} status={'warning'} title={'问卷暂未发布'} extra={<Button type={'primary'} onClick={() => nav(-1)}>返回上一页</Button>}>
        //     </Result>
        // }
        return <>
            <div className={styles.left}>
                <ComponentList selectedComponentId={selectedComponentId} setSelectedComponentId={setSelectedComponentId} />
            </div>
            <div className={styles.main}>
                <Typography.Title level={3} style={{ marginTop: 0 }}>答卷数量: {total}</Typography.Title>
                <Table rowKey={(c: any) => c._id} dataSource={list} columns={columns} loading={loadingTb} pagination={false} />
            </div>
            <div className={styles.right}>
                <div style={{ width: 400, height: 300 }}>
                    <ResponsiveContainer height={'100%'} width={'100%'}>
                        <BarChart width={400} height={300} margin={{
                            top: 5,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray={"3 3"}></CartesianGrid>
                            <XAxis dataKey={'name'} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey={'count'} fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    }
    return <div className={styles.container}>
        <StaticHeader />
        <div className={styles['content-wrapper']}>
            {loading && LoadingElement}
            {!loading && <div className={styles.content}>
                {genContentElement()}
            </div>}
        </div>
    </div>
}

export default Static