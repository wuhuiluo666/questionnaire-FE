import React from 'react'
import styles from './index.module.scss'
import { EditCanvas } from '../EditCanvas'
import { useGetQuestionDetail } from '../../../hooks/useLoadQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentList'

const Edit = () => {
    const { loading } = useGetQuestionDetail()
    const dispatch = useDispatch()
    const clearSelectId = () => {
        dispatch(changeSelectedId(''))
    }
    return <div className={styles['edit-container']}>
        <div>Edit Header</div>
        <div className={styles['content-wrapper']}>
            <div className={styles.content}>
                <div className={styles.left}>Left</div>
                <div onClick={clearSelectId} className={styles.main}>
                    <div className={styles['canvas-warpper']}>
                        <EditCanvas loading={loading} />
                    </div>
                </div>
                <div className={styles.right}>Rihgt</div>
            </div>
        </div>
    </div>
}

export default Edit