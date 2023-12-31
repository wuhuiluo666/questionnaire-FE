import React from 'react'
import styles from './index.module.scss'
import { EditCanvas } from '../EditCanvas'
import { useGetQuestionDetail } from '../../../hooks/useLoadQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentList'
import { LeftPanel } from '../leftPanel'
import { RightPanel } from '../rightPanel'
import { EditHeader } from '../editHeader'
import { useTitle } from 'ahooks'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'

const Edit = () => {
    const { title } = useGetPageInfo()
    const { loading } = useGetQuestionDetail()
    const dispatch = useDispatch()
    const clearSelectId = () => {
        dispatch(changeSelectedId(''))
    }
    useTitle(`问卷编辑 - ${title}`)
    return <div className={styles['edit-container']}>
        <EditHeader />
        <div className={styles['content-wrapper']}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <LeftPanel />
                </div>
                <div onClick={clearSelectId} className={styles.main}>
                    <div className={styles['canvas-warpper']}>
                        <EditCanvas loading={loading} />
                    </div>
                </div>
                <div className={styles.right}>
                    <RightPanel />
                </div>
            </div>
        </div>
    </div>
}

export default Edit