import React, { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'
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

const BarList: { name: string, count: number }[] = [
    {
        name: '11',
        count: 222
    },
    {
        name: '12',
        count: 242
    },
    {
        name: '13',
        count: 232
    },
    {
        name: '14',
        count: 122
    },
]

export const STAT_COLORS = [
    '#2468F2',
    '#A5E693',
    '#FAD000',
    '#F33E3E',
    '#A985FF',
    '#005C99',
    '#87D26D',
    '#FF8E52',
    '#E62E6B',
    '#98B8FF',
]

const Static = () => {
    const pieList = [
        { name: '饼图1', count: 1 },
        { name: '饼图2', count: 2 },
        { name: "饼图3", count: 3 }
    ]
    const sum = useMemo(() => {
        return pieList.reduce((prev, cur) => prev + cur.count, 0)
    }, [pieList])
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
                {/* <div style={{ width: 400, height: 300 }}>
                    <ResponsiveContainer height={'100%'} width={'100%'}>
                        <BarChart data={BarList} width={400} height={300} margin={{
                            top: 5,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray={"3 3"}></CartesianGrid>
                            <XAxis dataKey={'name'} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey={'count'} fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div> */}
                <div style={{ width: 400, height: 400 }}>
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <PieChart width={400} height={400}>
                            <Pie label={i => `${i.name} - ${Number((i.count / sum).toFixed(2)) * 100}%`} outerRadius={50} cx={'50%'} cy={'50%'} data={pieList} dataKey={'count'}>
                                {
                                    pieList.map((p, index) => {
                                        return <Cell key={index} fill={STAT_COLORS[index]}></Cell>
                                    })
                                }
                            </Pie>
                        </PieChart>
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