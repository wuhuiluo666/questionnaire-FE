import React, { useState } from 'react'
import { Result, Spin, Button } from 'antd'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { useGetQuestionDetail } from '../../../hooks/useLoadQuestionData'
import { useNavigate, useParams } from 'react-router-dom'
import { StaticHeader } from './header'
import styles from './index.module.scss'
import { ComponentList } from '../../../components/ComponentList.tsx'
import { useRequest } from 'ahooks'
import { getStaticListService } from '../../../services/static'


const Static = () => {
    const { id = '' } = useParams()
    const { loading: loadingTb } = useRequest(async () => {
        const data = await getStaticListService(id, { page: 1, pageSize: 10 })
        return data
    },
        {
            onSuccess: (data) => {
                console.log('data', data)
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
            <div className={styles.main}>Main</div>
            <div className={styles.right}>Right</div>
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